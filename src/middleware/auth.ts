const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from 'express'
const { JWT_SECRET_KEY = 'secret' } = process.env;

declare module 'express' {
  interface Request {
    user: {
      id: number;
      role: string;
    };
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(401);
    }

    const data = jwt.verify(authorization.split(' ')[1], JWT_SECRET_KEY);

    req.user = {
      id: data.id,
      role: data.role,
    };
    next();
  } catch (error) {
    throw error;
  }
}

const is_admin = async (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.user;
  if (role != "admin" && role != "superadmin") {
    return res.sendStatus(403);
  }
  next();
}

const is_superadmin = async (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.user;
  if (role != "superadmin") {
    return res.sendStatus(403);
  }
  next();
}

export { auth, is_admin, is_superadmin }