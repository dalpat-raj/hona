import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const sendOTP = async (phone: string) => {
  const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});

  const confirmation = await signInWithPhoneNumber(
    auth,
    `+91${phone}`,
    recaptcha
  );

  return confirmation;
};