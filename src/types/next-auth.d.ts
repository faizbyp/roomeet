import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's postal address. */
      name: string;
      email: string;
      address: string;
      id_user: string;
      role_id: string;
      accessToken: string;
      refreshToken: string;
      username: string;
      JWT: string;
    };
  }
}
