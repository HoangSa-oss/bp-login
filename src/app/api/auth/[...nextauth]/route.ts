import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/refresh-token`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token.token!.refreshToken}`,
        'Content-type': 'application/json',
      },
    });
    const response = await res.json();
    if(response.statusCode!=200){
      return {
        user: null,
        token: null
      }
    }
    return response.data
  }catch(err){
    return token
  } 
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider(
      {
      name: "Credentials",
      credentials: {},
      async authorize(credentials:any, req:any) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
       
        const user = await res.json();
        if (user.statusCode != 200) {
          throw new Error(user.message);
        }
        return user.data;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({token,user}){
     
      if (user) return { ...token, ...user };
      if(!token.token||!token.user){
        return {
          user: null,
          token: null
        }
      }
      if (new Date().getTime() < token.token.expiresIn)
        return token;
      const newtoken = await refreshToken(token);
      return newtoken

    },

    async session({ token, session }:any) {
 
      session.user = token.user;
      session.token = token.token;
      return session;
    },
  },
  events: {
    async signOut({ token,session }) {
      await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/logout`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token.token!.refreshToken}`,
        },
      });
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
