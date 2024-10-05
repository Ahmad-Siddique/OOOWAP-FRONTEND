import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { z } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/auth/";

async function getUser(email, password) {
  try {
    const user = await axios.post(API_URL + "login", { email, password });
    return user.data;
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut, update } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const userDB = await getUser(email, password);

          if (!userDB.success) return null;

          const user = {
            id: userDB.user.id,
            firstName: userDB.user.firstName,
            lastName: userDB.user.lastName,
            email: userDB.user.email,
            role: userDB.user.role,
            image: userDB.user.image,
            balance: userDB.user.balance,
            token: userDB.token,
          };

          // Save user data in localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem("ooowap-user", JSON.stringify(user));
          }
              
          return user;
        }

        return null;
      },
    }),
  ],
 
  
});
