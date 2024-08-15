import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios, { isAxiosError } from "axios";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
        subscription: { type: "object" },
      },
      async authorize(credentials, req) {
        try {
          const auth = await axios.post(`${process.env.APPURL}/user/login`, {
            username: credentials?.username,
            password: credentials?.password,
            subscription: credentials?.subscription,
          });
          const user = auth.data.data;
          console.log("USER", user);

          return user;
        } catch (error: any) {
          if (isAxiosError(error)) {
            console.error(error.response?.data.message as any);
            console.error(error.response);
            throw new Error(
              JSON.stringify({
                message: error.response?.data.message as any,
              })
            );
          } else {
            console.error(error);
            throw new Error(
              JSON.stringify({
                message: error.message as any,
              })
            );
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
