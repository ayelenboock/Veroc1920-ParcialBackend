import type { Request, Response, NextFunction } from "express";

//Verifica que el parámetro :id sea un número entero positivo antes de llegar al controlador

const validarId = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'El id debe ser un número entero positivo'});
    }

    next(); //si el id es válido, sigue al controlador
};

export default validarId;