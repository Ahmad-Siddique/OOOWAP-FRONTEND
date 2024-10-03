"use server";

import { signIn } from "../auth";
import { AuthError } from "next-auth";

export async function authenticate(prevState, formData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    console.log("ERROR TYPE",error.type)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return "Invalid credentials.";
      }
    }
    throw error;
  }

}
