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
import LoaderBall from "@/app/ui/loader/BallLoader";
import Spinner from "@/app/ui/loader/RingLoader";

export default function SignInForm() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [resendCountDown, setResendCountDown] = useState(0);
  const [recaptchaVerifier, setRecaptchVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountDown > 0) {
      timer = setTimeout(() => setResendCountDown(resendCountDown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountDown]);

  useEffect(() => {
    const recaptchVerifire = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      },
    );
    setRecaptchVerifier(recaptchVerifire);
    return () => {
      recaptchVerifire.clear();
    };
  }, [auth]);

  useEffect(() => {
    const hasEnteredAllDigits = otp.length === 6;
    if (hasEnteredAllDigits) {
      verifyOtp();
    }
  }, [otp]);

  const verifyOtp = async () => {
    startTransition(async () => {
      setError("");
      if (!confirmationResult) {
        setError("Please request OTP first.");
        return;
      }
      try {
        await confirmationResult?.confirm(otp);
        router.replace("/");
      } catch (err: any) {
        console.log(err);
        setError("Failed to verify OTP. Please check the OTP");
      }
    });
  };

  const requestOtp = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setResendCountDown(60);
    startTransition(async () => {
      setError("");
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
        console.log(err);
        setResendCountDown(0);
        if (err.code === "auth/invalid-phone-number") {
          setError("Invalid phone number. Please check the number.");
        } else if (err.code === "auth/too-many-requests") {
          setError("Too many requests. Please try again later.");
        } else {
          setError("Failed to sent OTP. please try again.");
        }
      }
    });
  };

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <div className="text-center">
        <h2 className=" mt-2 text-lg font-bold text-green-950">
          Enter Mobile Number
        </h2>
        <p className="my-2 text-md text-green-800 text-wrap">
          We will send you an OTP to verify your number
        </p>
      </div>
      {!confirmationResult && (
        <form onSubmit={requestOtp}>
          <div className="flex gap-2">
            <select
              name="con"
              id="con"
              className="border border-gray-300 rounded-md bg-none text-sm"
            >
              <option>INDIA</option>
            </select>
            <Input
              className="text-black"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-400 my-2">
            Please enter your number wit the country code (i.e. +91 for IN)
          </p>
        </form>
      )}

      {confirmationResult && (
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
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
      )}
      <Button
        disabled={!phoneNumber || isPending || resendCountDown > 0}
        onClick={() => requestOtp()}
        className="mt-5 w-full bg-green-900"
      >
        {resendCountDown > 0
          ? `Resend OTP in ${resendCountDown}`
          : isPending
            ? "Sending OTP"
            : "Send OTP"}
      </Button>

      <div className="p-10 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>

      <div id="recaptcha-container" />

      {isPending && <Spinner />}
    </div>
  );
}
