export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/home");
      if (isLoggedIn && !isOnDashboard) {
        return Response.redirect(new URL("/home", nextUrl));
      }
      // const isOnDashboard = nextUrl.pathname.startsWith("/home");
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL("/home", nextUrl));
      // }
      return true;
    },
    async session({ session, token }) {
      session.user = { ...session.user, ...token };
      // console.log("SESSION IN CALLBACK", session);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // console.log("USER IN JWT", user);
        token = { ...token, ...user };
        // console.log("TOKEN IN JWT", token);
      }
      return token;
    },
  },
  providers: [],
};
