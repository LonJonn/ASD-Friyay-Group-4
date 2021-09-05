import { User } from "@prisma/client";

import { db } from "@app/lib/db";


export async function deleteUser(email: any) {
  const deleteUserConst = await db.user.delete({
  where: {
    email: email,
  },
})
return deleteUserConst;
}

//String retrievedEmail = getEmail;

//const getUser: object | null = await db.user.findUnique({
    //where: {
    //  email: retrievedEmail,
   // },

  //})

//interface UserEmail extends Pick<User, "email"> {
  //  email: string;
  //}

//export type GetAllEmails = UserEmail[];

//const deleteUser = await db.user.delete({
  //  where: {
    //  email: 'bert@prisma.io',
    //},
  //})
