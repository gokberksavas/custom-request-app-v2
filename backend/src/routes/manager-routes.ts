import { Router } from 'express';
import { hashPassword } from  '@src/middlewares/hash-password';
import type { Request, Response } from "express";
import managerController from '@src/controllers/manager-controller';
import { authenticate } from '@src/middlewares/authenticate';
import jwt from 'jsonwebtoken';

export const managerRouter = Router();

managerRouter.post('/register', hashPassword, async (req: Request, res: Response) => {
  try {
    const createdManager = await managerController.createManager(req.body);
  
    res.status(201).send(createdManager);
  } catch (err) {
    res.sendStatus(500);
  }
});

managerRouter.post('/login', authenticate, async (req: Request, res: Response) => {
  try {
    const loggedInManager = await managerController.getManagerProfile(req.body.identifier);

    //non-null user because error will be caught on catch block
    const accessToken = jwt.sign(loggedInManager!, process.env.ACCESS_TOKEN_KEY!, { expiresIn: '15m' });

    res.status(200).send({ accessToken: accessToken });
  } catch (err) {
    res.sendStatus(500);
  }
});