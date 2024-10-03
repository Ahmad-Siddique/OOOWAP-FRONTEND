export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/home");
      console.log("PATH", nextUrl.pathname);
      if (isLoggedIn && !isOnDashboard) {
        // return Response.redirect(new URL("/home", nextUrl));
      }
      return true;
    },
    async session({ session, token }) {
      session.user = { ...session.user, ...token };
      return session;
    },
    async jwt({ token, user }) {
      
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
  },
  providers: [],
};
