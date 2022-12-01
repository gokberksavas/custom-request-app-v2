import prisma from '@src/prisma/create-prisma-instance';
import { Manager } from '@src/types/manager-types';

class ManagerController {
  async createManager(manager: Manager): Promise<Partial<Manager>> {
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
  //use with try catch
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
  //identifier can be username or email && it will throw an error if record is not found, should be try/catched
  async getManagerPassword(identifier: string): Promise<string> {
    const manager = await prisma.manager.findFirstOrThrow({
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

    return manager.password;
  }
  //use with try catch
  async getManagerProfile(identifier: string): Promise<Partial<Manager>> {
    const manager = await prisma.manager.findFirstOrThrow({
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
