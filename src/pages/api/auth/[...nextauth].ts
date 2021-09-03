import { PrismaClient, User } from "@prisma/client";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],

  adapter: PrismaAdapter(prisma),

  callbacks: {
    session: async (session, user) => {
      if (session.user) {
        session.uid = user.id as string;
      }

      return session;
    },
  },
});
