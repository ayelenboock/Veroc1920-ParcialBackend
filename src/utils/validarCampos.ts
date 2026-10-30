import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validarCampos = (req: Request, res: Response, next: NextFunction) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log("Errores de validación detectados:", errores.array());
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};
