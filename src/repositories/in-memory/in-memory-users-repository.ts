import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: String(this.items.length + 1),
      ...data,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    return user || null
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id)

    return user || null
  }
}
