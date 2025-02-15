import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;

interface AuthenticatedRequest extends Request {
  user?: any;
}

export function authenticateAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No se a proporcionado un token' });
  }
  
  const token = authHeader.split(' ')[1];
  const decodedWithoutVerify = jwt.decode(token);

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    console.log("EL PRIVILEGIO ES: ADMINISTRADOR", decoded.privilege);
    if (!decoded || decoded.privilege !== 'administrador') {
      return res.status(403).json({ message: 'Requiere acceso de administrador' });
    }
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalido' });
  }
}

export function authenticateClient(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No se a proporcionado un token' });
  }
  
  const token = authHeader.split(' ')[1];
  const decodedWithoutVerify = jwt.decode(token);

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);

    if (!decoded || decoded.privilege !== 'cliente') {
      return res.status(403).json({ message: 'Requiere acceso de cliente' });
    }
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalido' });
  }
}

