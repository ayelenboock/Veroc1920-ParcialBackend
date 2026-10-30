import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/prisma/client.js"

//Modificación del middleware anterior. Recibe los errores que los controladores envían 
//con next(err) y responde con un código HTTP y un mensaje, lo que evita responder con un 
//error crudo

const manejoErrores = (err: any, req: Request, res:Response, next: NextFunction) => {
    console.error(err);

    //errores conocidos de Prisma con código tipo P2xxx
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002': //valor duplicado en un campo UNIQUE
                return res.status(400).json({ error: 'El registro ya existe (valor duplicado)' });
            case 'P2003': // el registro relacionado a una FK no existe o está en uso
                if (req.method === 'DELETE') {
                    return res.status(409).json({ error: 'No se puede eliminar: tiene registros asociados (por ejemplo, pedidos)'});
                }
                return res.status(400).json({ error: 'El registro relacionado no existe' });
            case 'P2025': //el registro a eliminar o modificar no existe
                return res.status(404).json({ error: 'Registro no encontrado. No existe'});
        }
    }
    //Datos con tipo o formato inválido (por ejemplo, un enum que no existe)
    if (err instanceof Prisma.PrismaClientValidationError) {
        return res.status(400).json({ error: 'El formato de los datos ingresados es inválido'});
    }

    //JSON malformado en el body
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'El cuerpo de la petición no es un JSON válido'});    
    }

    //errores lanzados a mano con un status
    if (err.status) {
        return res.status(err.status).json({ error: err.message });
    }

    return res.status(500).json({ error: 'Error interno del servidor' });
}

export default manejoErrores;