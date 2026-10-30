import type { Request, Response, NextFunction } from "express";
import { normalizarEnum } from "../utils/normalizarEnum.js";

//Campos del body que corresponden a enums de Prisma
const CAMPOS_ENUM = ['condicion_iva', 'estado'];

//Antes de llegar al controlador, convierte los espacios de esos campos en guión bajo
const normalizarEnums = (req: Request, res: Response, next: NextFunction) =>{
    if (req.body && typeof req.body === 'object') {
        for (const campo of CAMPOS_ENUM) {
            if (campo in req.body) {
                req.body[campo] = normalizarEnum(req.body[campo]);
            }
        }
    }
    next();//sigue al controlador
};

export default normalizarEnums;

