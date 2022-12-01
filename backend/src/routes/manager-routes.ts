import { Router } from 'express';
import { hashPassword } from '@src/middlewares/hash-password';
import type { Request, Response } from 'express';
import managerController from '@src/controllers/manager-controller';
import { authenticate } from '@src/middlewares/authenticate';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { Manager } from '@src/types/manager-types';

export const managerRouter = Router();

//Manager: { email, username, password, firstname, lastname }
managerRouter.post('/register', hashPassword, async (req: Request, res: Response) => {
  try {
    const createdManager = (await managerController.createManager(req.body)) as Partial<Manager>;

    res.status(201).send(createdManager);
  } catch (err) {
    res.sendStatus(500);
  }
});

//data = { identifier: username/email, password }
managerRouter.post('/login', authenticate, async (req: Request, res: Response) => {
  try {
    const loggedInManager = (await managerController.getManagerProfile(req.body.identifier)) as Partial<Manager>;
    const accessToken = jwt.sign({ manager: loggedInManager }, process.env.ACCESS_TOKEN_KEY as string, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ email: loggedInManager.email }, process.env.REFRESH_TOKEN_KEY as string, {
      expiresIn: '12h',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 12 * 60 * 60 * 1000,
    });

    res.status(200).send({ accessToken: accessToken });
  } catch (err) {
    res.sendStatus(500);
  }
});

managerRouter.post('/refresh-token', async (req: Request, res: Response) => {
  const refreshToken = req.cookies['refresh_token'];

  if (!refreshToken) return res.send(500);

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY as string) as JwtPayload;
    const manager = (await managerController.getManagerProfile(decoded.email)) as Partial<Manager>;
    const accessToken = jwt.sign({ manager: manager }, process.env.ACCESS_TOKEN_KEY as string, { expiresIn: '15m' });

    res.status(200).send({ accessToken: accessToken });
  } catch (err) {
    res.sendStatus(401);
  }
});
