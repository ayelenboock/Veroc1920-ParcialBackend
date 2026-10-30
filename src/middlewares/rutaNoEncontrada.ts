import type { Request, Response } from "express";

const rutaNoEncontrada = (req: Request, res: Response) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
}

export default rutaNoEncontrada;
