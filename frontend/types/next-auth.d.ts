import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      token: JWT;
      id: number;
      email: string;

      userType: "student" | "doctor" | "admin";
    };
  }
}
