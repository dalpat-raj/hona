"use server";

// import { signIn, signOut } from "@/auth";
import { getPasswordResetTokenByToken, getUserByEmail } from "@/lib/data";
import { db } from "@/lib/db";
// import { saltAndHashPassword } from "@/lib/helpers";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, NewPasswordSchema, RegisterSchema, ResetSchema } from "@/schema";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { AuthError } from "next-auth";
import { z } from "zod";



// export const Login= async(
//   values:z.infer<typeof LoginSchema>,
//   callbackUrl?: string | null,
// ) => {
//   const validatedFields = LoginSchema.safeParse(values);

//   if(!validatedFields.success){
//     return { error: "Invalid fields!" };
//   }

//   const { email, password } = validatedFields.data;

//   try {
//     await signIn("credentials", {
//       email,
//       password,
//       redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
//     });

//     return {success: "login success"}
//   } catch (error: any) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return {error: "Invalid credentials!"}
//         default:
//           return {error:"Something went wrong!"}
//       }
//     }

//     throw error;
//   }
// };

export const Register= async(values:z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if(!validatedFields.success){
    return { error: "Invalid fields!" };
  }

  const {name, email, password } = validatedFields.data;
  // const hasedPassword = saltAndHashPassword(password)
  const hasedPassword = password

  
  const existingUser = await getUserByEmail(email);

  if(existingUser){
    return { error: "email already in use!"}
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hasedPassword,
    }
  });

  return {success: "Register success"}
};

// export const Logout = async () => {
//   await signOut();
// }

export const Reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if(!validatedFields.success){
    return { error: "Invalid email!"}
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if(!existingUser){
    return { error: "Email not found!" }
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  )

  return { success: "Check your email box!" }
}

export const NewPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if(!token){
    return {error: "Missing token"};
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if(!validatedFields.success){
    return { error: "Invalid fields!" }
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if(!existingToken){
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if(hasExpired){
    return { error: "Token has expired!" }
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if(!existingUser){
    return { error: "Email does not exists!" }
  }

  const hashPassword = password;
  // const hashPassword = saltAndHashPassword(password);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashPassword }
  })

  await db.passwordResetToken.delete({
    where: { id: existingToken.id }
  })

  return { success: "Password Updated!" }
}

