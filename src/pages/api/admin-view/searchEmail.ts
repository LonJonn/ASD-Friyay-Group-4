import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { searchEmail } from "@app/services/admin-view/search-email";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//API endpoint that calls the searchEmail() function in the controller
export default async (req: { body: any; }, res: { setHeader: (arg0: string, arg1: string) => void; end: (arg0: string) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { err: string; }): void; new(): any; }; }; }) => {

  const id1 = req.body;
  try {
    const searchedEmails = await searchEmail(id1);
    return new Promise<void> ((resolve, reject) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(searchedEmails));
      resolve();
    })

  } catch (error) {
    res.status(403).json({ err: "Error occured while searching for a user." });
  }

};
