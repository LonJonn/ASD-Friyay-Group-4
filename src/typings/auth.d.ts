import "next-auth";

declare module "next-auth" {
  export interface Session {
    uid?: string;
  }
}

declare module "next-auth/client" {
  export interface Session {
    uid?: string;
  }
}
