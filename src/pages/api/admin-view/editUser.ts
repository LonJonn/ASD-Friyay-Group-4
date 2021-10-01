import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { editUser } from "@app/services/admin-view/edit-user";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//API endpoint that calls the createUser() function in the controller
export default async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { err: string; }): void; new(): any; }; }; }) => {
  //Get API body data (name + email as a string value and pass to the createUser() function)
  const id1 = req.body;

  try {
    editUser(id1);
  } catch (error) {
    res.status(403).json({ err: "Error occured while editing a user." });
  }
};