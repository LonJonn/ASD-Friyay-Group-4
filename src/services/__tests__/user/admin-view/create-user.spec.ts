import { createUser } from '@app/services/admin-view/create-user'
import { prismaMock } from '../../../../../singleton'

const d = new Date("2015-03-25T12:00:00Z");

test('should create new user ', async () => {
 //create user variable   
    const user = {
      id: '1',
      name: 'Rich',
      email: 'hello@prisma.io',
      emailVerified: null,
      image: null,
      createdAt: d,
      updatedAt: d,
    }
  
    const name = String(user.name);
    const email = String(user.email);
    const id1 = String(name + "," + email);
  
  //'create user' mock value in mock db
    prismaMock.user.create.mockResolvedValue(user)
    prismaMock.$disconnect()
  
  //pass through createUser function in services and check it returns the same user
    expect(createUser(id1)).resolves.toEqual({
      name: 'Rich',
      email: 'hello@prisma.io',
    });
  });