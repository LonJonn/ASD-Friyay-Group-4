import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { deleteUser } from "@app/services/admin-view/delete-user";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//API endpoint which runs the deleteUser() function in the controller
export default async (req, res) => {
  //Get API body data (email as a string value and pass to the deleteUser() function)
  const id = req.body;
  try {
    deleteUser(id);
  } catch (error) {
    res.status(403).json({ err: "Error occured while deleting a user." });
  }
};
