import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { searchUser } from "@app/services/admin-view/search-user";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//API endpoint that calls the searchUser() function in the controller
export default async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { err: string; }): void; new(): any; }; }; }) => {

  const id1 = req.body;
  try {
    const searchedUsers = await searchUser(id1);
    return new Promise ((resolve, reject) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(searchedUsers));
      resolve();
    }).catch(error => {
      res.json(error);
    });

  } catch (error) {
    res.status(403).json({ err: "Error occured while searching for a user." });
  }

};
