"use server";

import { signIn } from "../auth";

export async function authenticate(prevState, formData) {
  await signIn("credentials", formData);
}
