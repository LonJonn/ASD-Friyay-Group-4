import "next-auth";

declare module "next-auth" {
  export interface User {
    id: string;
  }

  export interface Session {
    uid?: string;
  }
}

declare module "next-auth/client" {
  export interface Session {
    uid?: string;
  }
}
