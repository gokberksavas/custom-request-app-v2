import prisma from '../prisma/create-prisma-instance';
import { Manager } from 'src/types/manager-types';

class ManagerController {
  async createManager(manager: Manager): Promise<Partial<Manager> | null> {
    const createdManager = await prisma.manager.create({
      data: manager,
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    return createdManager;
  }
  async deleteManager(id: number): Promise<Partial<Manager>> {
    const deletedManager = await prisma.manager.delete({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    return deletedManager;
  }
  //identifier can be username or email
  async getManagerPassword(identifier: string): Promise<string | null> {
    const manager = await prisma.manager.findFirst({
      where: {
        OR: [
          {
            username: identifier,
          },
          {
            email: identifier,
          },
        ],
      },
      select: {
        password: true,
      },
    });

    return manager?.password ?? null;
  }
  async getManagerProfile(identifier: string): Promise<Partial<Manager> | null> {
    const manager = await prisma.manager.findFirst({
      where: {
        OR: [
          {
            username: identifier,
          },
          {
            email: identifier,
          },
        ],
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    return manager;
  }
}

export default new ManagerController();
