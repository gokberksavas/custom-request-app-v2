import type { Request, Response, NextFunction } from "express";
import managerController from '@src/controllers/manager-controller';
import bcrypt from 'bcrypt';


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { identifier, password } = req.body;
  const hash = await managerController.getManagerPassword(identifier);

  console.log(hash);

  if (!hash) return res.sendStatus(500);

  try {
    const authenticated = await bcrypt.compare(password, hash!);
    
    if (authenticated) return next();

    res.sendStatus(401);
  } catch (err) {
    res.sendStatus(500);
  }
};