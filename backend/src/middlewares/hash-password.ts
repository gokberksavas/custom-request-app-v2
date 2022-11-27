import bcrypt from 'bcrypt';
import type { Request, Response, NextFunction } from 'express';

export const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  try {
    const salt = await bcrypt.genSalt(12);
    const saltedPassword = await bcrypt.hash(password, salt);

    req.body.password = saltedPassword;

    console.log(saltedPassword);

    next();
  } catch (err) {
    res.sendStatus(500);
  }
};
