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
        const { email, password } = credentials as any;
        const passwordHash = createHash("sha256")
          .update(password)
          .digest("hex");

        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth`,
          {
            params: {
              role: "admin",
              email,
              password: passwordHash,
            },
          }
        );

        if (!data.data) {
          throw new Error("User not found.");
        }
        const userObj = data.data as any;
        userObj.userType = "admin";
        return data.data as any;
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
        const { email, password } = credentials as any;
        const passwordHash = createHash("sha256")
          .update(password)
          .digest("hex");

        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth`,
          {
            params: {
              role: "teacher",
              email,
              password: passwordHash,
            },
          }
        );
        if (!data.data) {
          throw new Error("User not found.");
        }
        const userObj = data.data as any;
        userObj.userType = "teacher";
        return data.data as any;
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
        const { email, password } = credentials as any;
        const passwordHash = createHash("sha256")
          .update(password)
          .digest("hex");

        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth`,
          {
            params: {
              role: "student",
              email,
              password: passwordHash,
            },
          }
        );
        if (!data.data) {
          throw new Error("User not found.");
        }

        const userObj = data.data as any;
        userObj.userType = "student";
        return data.data as any;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "gt782w4e5dr6fty7uvbihogyu53df6b7aa55",
  },

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
