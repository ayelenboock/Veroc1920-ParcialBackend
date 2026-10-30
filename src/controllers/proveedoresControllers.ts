import type { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import ProveedoresModel from '../models/proveedoresModels.js'
import type { ProveedorCondicionIva } from '../generated/prisma/enums.js';
import { normalizarEnum } from '../utils/normalizarEnum.js';

class ProveedoresController {
    constructor () { }

//GET
    async consultar(req:Request, res:Response, next: NextFunction) {
        try {
            const proveedores = await ProveedoresModel.obtenerTodos();

            return res.status(200).json({
                total: proveedores.length,
                proveedores: proveedores
            });

       }catch(err){
           next(err); // lo maneja el middleware global de errores
       }
    }

//GET proveedores filtrados por condición de IVA
    async consultarPorCondicion(req:Request, res:Response, next: NextFunction) {
        try {
            const { condicion } = req.params;

            // Usamos normalizarEnum para convertir un valor de enum al formato que usa Prisma
            const condicionFormateada = normalizarEnum (condicion) as ProveedorCondicionIva;

            const proveedores = await ProveedoresModel.obtenerPorCondicion(condicionFormateada);

            return res.status(200).json({
                total: proveedores.length,
                proveedores: proveedores
            });
           }catch(err){
               next(err); // lo maneja el middleware global de errores
           }
    }

//GET estadísticas: productos y stock por proveedor
    async estadisticas(req:Request, res:Response, next: NextFunction) {
        try {
            // Traemos los proveedores e incluimos el stock de sus productos asociados
            const resultado = await ProveedoresModel.obtenerEstadisticas();

            // Mapeamos los resultados para consolidar las sumas en memoria de forma veloz
            const estadisticasFormateadas = resultado.map((prov:any) => {
                const stockTotal = prov.productos.reduce((acumulado:number, prod:any) => acumulado + prod.stock, 0);

                return {
                    id_proveedor: prov.id_proveedor,
                    razon_social: prov.razon_social,
                    cantidad_productos: prov.productos.length,
                    stock_total: stockTotal
                };
            });

            return res.status(200).json({ estadisticas: estadisticasFormateadas });
           }catch(err){
               next(err); // lo maneja el middleware global de errores
           }
    }

 // POST
  async ingresar(req: Request, res: Response, next: NextFunction) {
    try {
      const data = matchedData(req);

      const nuevoProveedor = await ProveedoresModel.crear({
        ...data,
        condicion_iva: data.condicion_iva as ProveedorCondicionIva
      });

      return res.status(201).json({
        mensaje: 'Proveedor creado con éxito',
        id: nuevoProveedor.id_proveedor
      });
    } catch (err) {
      next(err);
    }
  }

 //GET id
    async consultarDetalle(req:Request, res:Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const proveedor = await ProveedoresModel.obtenerPorId(Number(id));

            if (!proveedor) {
                return res.status(404).json({ error: 'Proveedor no encontrado' });
            }

            return res.status(200).json(proveedor);
            }catch(err){
                next(err); // lo maneja el middleware global de errores
            }
    }
// PUT
  async actualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req);

      const proveedorActualizado = await ProveedoresModel.actualizar(id, {
        ...data,
        condicion_iva: data.condicion_iva as ProveedorCondicionIva
      });

      return res.status(200).json({
        mensaje: 'Proveedor actualizado con éxito',
        proveedor: proveedorActualizado
      });
    } catch (err) {
      next(err);
    }
  }
// PATCH
  async actualizarParcial(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req);

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron campos válidos para actualizar' });
      }

      // Verificamos que el proveedor exista
      const proveedorExistente = await ProveedoresModel.obtenerPorId(id);
      if (!proveedorExistente) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      }

      const proveedorActualizado = await ProveedoresModel.actualizarParcial(id, data);

      return res.status(200).json({
        mensaje: 'Proveedor actualizado con éxito',
        proveedor: proveedorActualizado
      });
    } catch (err) {
      next(err);
    }
  }

    async eliminar(req:Request, res:Response, next: NextFunction) {
         try{
            const  id  = Number(req.params.id);

            const ProveedorExistente = await ProveedoresModel.obtenerPorId(id);

                        if (!ProveedorExistente) {
                          return res.status(404).json({
                            error: 'Proveedor no encontrado' });
                        }
                        await ProveedoresModel.eliminar(id);
                        return res.status(200).json({
                             mensaje: 'Proveedor eliminado con éxito' });

                  }catch(err){
                      next(err); // lo maneja el middleware global de errores
                  }
    }

}

export default new ProveedoresController();
