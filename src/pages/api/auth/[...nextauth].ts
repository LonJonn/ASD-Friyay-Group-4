import { PrismaClient, User } from "@prisma/client";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    // Init our Auth0 client from env vars
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],

  adapter: PrismaAdapter(prisma),

  callbacks: {
    session: async (session, user) => {
      // On session change, add the user id to the session object so we can
      // reference it later in our API handlers
      if (session.user) {
        session.uid = user.id as string;
      }

      // Return the modified session
      return session;
    },
  },
});
