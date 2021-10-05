import { createUser } from '@app/../functions-without-context'
import { prismaMock } from '../../../../../singleton'

const d = new Date("2015-03-25T12:00:00Z");

test('should create new user ', async () => {
    const user = {
      id: '1',
      name: 'Rich',
      email: 'hello@prisma.io',
      emailVerified: null,
      image: null,
      createdAt: d,
      updatedAt: d,
    }
  
    prismaMock.user.create.mockResolvedValue(user)
  
    expect(user).toEqual({
      id: '1',
      name: 'Rich',
      email: 'hello@prisma.io',
      emailVerified: null,
      image: null,
      createdAt: d,
      updatedAt: d,
    })
  })
