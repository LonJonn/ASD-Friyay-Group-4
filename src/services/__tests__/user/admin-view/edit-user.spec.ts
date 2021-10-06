import { editUser } from '@app/services/admin-view/edit-user'
import { prismaMock } from '../../../../../singleton'

const d = new Date("2015-03-25T12:00:00Z");

  test('should update a users name and email ', async () => {
  // create user variable 
    const user = {
      id: '1',
      name: 'Rich',
      email: 'hello@prisma.io',
      emailVerified: null,
      image: null,
      createdAt: d,
      updatedAt: d,
    }

  // create userEdit variable 
    const userEdit = {
      id: '1',
      name: 'Rich Haines',
      email: 'HelloWorld@prisma.io',
      emailVerified: null,
      image: null,
      createdAt: d,
      updatedAt: d,
    }
  
    const oldEmail = String(user.email);

    const newName = String(userEdit.name);
    const newEmail = String(userEdit.email);

    const id1 = String(newName + "," + newEmail + "," + oldEmail);
  
  // 'create user' and 'update user' mock value in mock database
    prismaMock.user.create.mockResolvedValue(user)
    prismaMock.user.update.mockResolvedValue(userEdit)
  
  //pass through editUser function in services and check it returns the updated user details
    expect(editUser(id1)).resolves.toEqual({
      name: 'Rich Haines',
      email: 'helloWorld@prisma.io',
    });
  });