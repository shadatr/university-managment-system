import { createHash } from "crypto";

import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "admin",
      id: "admin",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { email, password, role } = credentials as any;
        const passwordHash = createHash("sha256")
          .update(password)
          .digest("hex");

        try {
          const data = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`,
            {
              params: {
                role,
                email,
                password: passwordHash,
              },
            }
          );

          const userObj = data as any;
          userObj.userType = "admin";
          return data as any;
        } catch (error) {
          return null;
        }
      },
    }),
    CredentialsProvider({
      name: "teacher",
      id: "teacher",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { email, password, role } = credentials as any;
        const passwordHash = createHash("sha256")
          .update(password)
          .digest("hex");

        try {
          const data = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`,
            {
              params: {
                role,
                email,
                password: passwordHash,
              },
            }
          );

          const userObj = data as any;
          userObj.userType = "teacher";
          return data as any;
        } catch (error) {
          return null;
        }
      },
    }),
    CredentialsProvider({
      name: "student",
      id: "student",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { email, password, role } = credentials as any;
        const passwordHash = createHash("sha256")
          .update(password)
          .digest("hex");

        try {
          const data = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`,
            {
              params: {
                role,
                email,
                password: passwordHash,
              },
            }
          );

          const userObj = data as any;
          userObj.userType = "student";
          return data as any;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.token = token;
      session.user.email = token.email as any;
      session.user.id = token.id as any;
      session.user.userType = token.userType as any;
      return session;
    },
  },
  pages: {
    signIn: "../../auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
