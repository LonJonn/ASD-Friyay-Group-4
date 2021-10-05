import prisma from './client'

interface CreateUser {
  id: string;
  name: string;
  email: string;
  emailVerified: null;
  image: null;
  createdAt: Date;
  updatedAt: Date;
  }
  
  export async function createUser(user: CreateUser) {
      return await prisma.user.create({
        data: user,
      })
    }
      interface UpdateUser {
        id: string;
        name: string;
        email: string;
        emailVerified: null;
        image: null;
        createdAt: Date;
        updatedAt: Date;
      }
      
      export async function updateUsername(user: UpdateUser) {
        return await prisma.user.update({
          where: { id: user.id },
          data: user,
        })
      }
  