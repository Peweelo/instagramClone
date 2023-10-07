import NextAuth from "next-auth"
import { Session } from "next-auth"
declare module "next-auth" {

  interface Session {
    user: {
      image: string,
      name: string,
      lastname: string,
      id: number,
      email: string
      username: string
    }
  }
}