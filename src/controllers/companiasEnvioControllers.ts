import type { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import CompaniasEnvioModel from '../models/companiasEnvioModels.js';

class CompaniasEnvioController {
  constructor() {}

 //GET
    async consultar(req:Request, res:Response, next: NextFunction) {
       try{
        const companias = await CompaniasEnvioModel.obtenerTodos();

        return res.status(200).json({
            total: companias.length,
            companias: companias
        });

        }catch(err){
            next(err); // lo maneja el middleware global de errores
        }
   }

    //GET compañías por nombre
    async buscar(req:Request, res:Response, next: NextFunction) {
        try {
        const { texto } = req.params;

        // Consultamos en la tabla companiaEnvio buscando coincidencias en la columna nombre
        const result = await CompaniasEnvioModel.buscarPorNombre(String(texto));

        return res.status(200).json({
            total: result.length,
            companias: result
        });
        }catch(err){
            next(err); // lo maneja el middleware global de errores
        }
   }

    //GET envíos por compañía
    async estadisticas(req:Request, res:Response, next: NextFunction) {
        try {
        // Consultamos las compañías de envío junto con la cantidad de pedidos de cada una
        const resultado = await CompaniasEnvioModel.obtenerEstadisticas();

        // Formateamos la respuesta para que devuelva un formato limpio y descriptivo
        const estadisticasFormateadas = resultado.map((compania:any) => ({
            id_compania: compania.id_compania,
            nombre: compania.nombre,
            total_envios: compania._count.pedidos
        }));

        return res.status(200).json({ estadisticas: estadisticasFormateadas });

        }catch(err){
            next(err); // lo maneja el middleware global de errores
        }
       }

    //POST
   
  async ingresar(req: Request, res: Response, next: NextFunction) {
    try {
      const data = matchedData(req) as { nombre: string; telefono: string; direccion: string; id_ciudad: number };

      const nuevaCompania = await CompaniasEnvioModel.crear(data);

      return res.status(201).json({
        mensaje: 'Compañía de envío creada con éxito',
        id: nuevaCompania.id_compania
      });
    } catch (err) {
      next(err);
    }
  }
    //GET id
    async consultarDetalle(req:Request, res:Response, next: NextFunction) {
        try {
            const { id } = req.params;

            // El model trae la compañía junto con los datos de su ciudad (JOIN)
            const compania = await CompaniasEnvioModel.obtenerPorId(Number(id));

            // si prisma no encuentra el registro, devuelve null
            if (!compania) {
                return res.status(404).json({ error: 'Compañía de envío no encontrada' });
            }

            return res.status(200).json(compania);

        }catch(err){
            next(err); // lo maneja el middleware global de errores
        }
    }

// PUT
  async actualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req) as { nombre: string; telefono: string; direccion: string; id_ciudad: number };

      const companiaActualizada = await CompaniasEnvioModel.actualizar(id, data);

      return res.status(200).json({
        mensaje: 'Compañía de envío actualizada con éxito',
        compania: companiaActualizada
      });
    } catch (err) {
      next(err);
    }
  }
// PATCH
  async actualizarParcial(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req) as { nombre: string; telefono: string; direccion: string; id_ciudad: number };

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron campos válidos para actualizar' });
      }

      const companiaExistente = await CompaniasEnvioModel.obtenerPorId(id);
      if (!companiaExistente) {
        return res.status(404).json({ error: 'Compañía de envío no encontrada' });
      }

      const companiaActualizada = await CompaniasEnvioModel.actualizarParcial(id, data);

      return res.status(200).json({
        mensaje: 'Compañía de envío actualizada con éxito',
        compania: companiaActualizada
      });
    } catch (err) {
      next(err);
    }
  }

    async eliminar(req:Request, res:Response, next: NextFunction) {
        try{
            const id  = Number(req.params.id);
            const companiaExistente = await CompaniasEnvioModel.obtenerPorId(id);

        if (!companiaExistente) {
            return res.status(404).json({ error: 'Compañía de envio no encontrada' });
        }

        // Si existe, procedemos a eliminarla de la base de datos
        await CompaniasEnvioModel.eliminar(id);
          res.status(200).json({ mensaje: 'Compañía de envio eliminada con éxito' });
        }catch(err){
            next(err); // lo maneja el middleware global de errores
        }
    }
}
export default new CompaniasEnvioController();
