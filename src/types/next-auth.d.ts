import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user_name: string;
      email: string;
    }|null;

    token: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    }|null;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      user_name: string;
      email: string;
      
    }|null;

    token: {
      expiresIn: number;
      accessToken: string;
      refreshToken: string;
    }|null;
  }
}
