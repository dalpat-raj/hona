"use client";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "sonner";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// shadcn otp input
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/app/ui/loader/RingLoader";

export default function SignInForm() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [resendCountDown, setResendCountDown] = useState(0);
  const [recaptchaVerifier, setRecaptchVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountDown > 0) {
      timer = setTimeout(() => setResendCountDown(resendCountDown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountDown]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as any).recaptchaVerifier) {
      setRecaptchVerifier((window as any).recaptchaVerifier);
      return;
    }

    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });

    (window as any).recaptchaVerifier = verifier;
    setRecaptchVerifier(verifier);
  }, []);

  const verifyOtp = async () => {
    if (isVerifying) return;
    if (!confirmationResult) {
      setError("Please request OTP first");
      return;
    }
    setIsVerifying(true);

    startTransition(async () => {
      try {
        const result = await confirmationResult.confirm(otp);
        const token = await result.user.getIdToken(true);

        await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        toast.success("Login successful 🎉");
        router.back();
        router.refresh();
      } catch (err) {
        setError("OTP failed");
      } finally {
        setIsVerifying(false);
      }
    });
  };

  const requestOtp = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    setError("");
    setSuccess("");
    setResendCountDown(60);

    startTransition(async () => {
      if (!recaptchaVerifier) {
        return setError("RecaptchaVerifier is not initialized.");
      }

      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifier,
        );

        setConfirmationResult(confirmationResult);
        setSuccess("OTP sent successfully");
      } catch (err: any) {
        setResendCountDown(0);
        setError("Something went wrong");
      }
    });
  };

  return (
    <div className="max-w-sm mx-auto ">
      <div className="text-center">
        <h1 className="text-[20px] font-bold text-blue">Sign In</h1>
        <h2 className=" mt-2 text-[17px] font-semibold text-blue">
          Enter Mobile Number
        </h2>
        <p className="my-1 text-[14px] text-gray-500 text-wrap max-sm:mb-6">
          We will send you an OTP to verify your number
        </p>
      </div>
      {!confirmationResult && (
        <form onSubmit={requestOtp}>
          <div className="flex gap-2">
            <div className="flex items-center px-3 border bg-white rounded-md bg-gray-100 text-sm">
              +91
            </div>
            <Input
              className="text-black bg-white"
              type="tel"
              name="phone"
              maxLength={10}
              autoComplete="tel-national"
              inputMode="numeric"
              value={phoneNumber.replace("+91", "")}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPhoneNumber("+91" + value);
              }}
              placeholder="Enter mobile number"
            />
          </div>
          <p className="text-xs text-gray-400 my-2 ">
            Please enter your number wit the country code (i.e. +91 for IN)
          </p>
        </form>
      )}

      {confirmationResult && (
        <div className="flex flex-col items-center gap-4">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      )}

      <div className="flex justify-start items-center gap-4 max-sm:gap-6 py-4">
        <input type="checkbox" className="scale-150" />
        <p className="text-[13px]">
          By continuing you agree that. you have read and accupt Shiprocket's T&C and Privacy Policy.
        </p>
      </div>
      <Button
        disabled={
          isPending ||
          isVerifying ||
          (!confirmationResult && resendCountDown > 0) ||
          (confirmationResult && otp.length !== 6)
        }
        onClick={() => {
          if (confirmationResult) {
            verifyOtp();
          } else {
            requestOtp();
          }
        }}
        className="mt-5 w-full py-4 rounded-lg text-white font-semibold
  bg-gradient-to-r from-[#34d399] via-[#1db39f] to-[#0ea5a4]
  backdrop-blur-md text-[15px] max-sm:py-6"
      >
        {isVerifying
          ? "Verifying..."
          : isPending
            ? "Sending OTP..."
            : confirmationResult
              ? "Verify OTP"
              : "Send OTP"}
      </Button>

      {confirmationResult && (
        <p className="text-center text-sm text-gray-500 mt-2">
          {resendCountDown > 0 ? (
            <>Resend OTP in {resendCountDown}s</>
          ) : (
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => requestOtp()}
            >
              Resend OTP
            </span>
          )}
        </p>
      )}

      <div className="p-10 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>

      <div id="recaptcha-container" />

      {isPending && <Spinner />}
    </div>
  );
}
