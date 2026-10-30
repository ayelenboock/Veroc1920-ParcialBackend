import type { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import PedidosModel from '../models/pedidosModels.js';
import type { PedidoEstado } from '../generated/prisma/enums.js';
import { normalizarEnum } from '../utils/normalizarEnum.js';

class PedidosController {
    constructor (){}

//GET
    async consultar(req:Request, res:Response, next: NextFunction) {
        try {
            // El model trae cada pedido con su cliente, empleado y compañía (JOIN)
            const pedidos = await PedidosModel.obtenerTodos();

            return res.status(200).json({
                total: pedidos.length,
                pedidos: pedidos
            });
       } catch (err) {
           next(err); // lo maneja el middleware global de errores
       }
    }
// POST
  async ingresar(req: Request, res: Response, next: NextFunction) {
    try {
      const data = matchedData(req); // Contiene id_cliente, id_empleado, id_compania, estado y el array detalles

      const { id_cliente, id_empleado, id_compania, estado, detalles } = data;

      const pedido = await PedidosModel.crearConDetalle({
        id_cliente,
        id_empleado,
        id_compania,
        ...(estado && { estado: estado as PedidoEstado })
      }, detalles);

      return res.status(201).json({ mensaje: 'Pedido creado con éxito', pedido });
    } catch (err) {
      next(err);
    }
  }
// POST: agrega un producto a un pedido existente
  async agregarDetalle(req: Request, res: Response, next: NextFunction) {
    try {
      const id_pedido = Number(req.params.id);
      const data = matchedData(req); // Trae únicamente id_producto y cantidad normalizados

      const detalle = await PedidosModel.agregarDetalle(id_pedido, { 
        id_producto: data.id_producto, 
        cantidad: data.cantidad 
      });
      
      return res.status(201).json({ mensaje: 'Producto agregado al pedido', detalle });
    } catch (err) {
      next(err); 
    }
  }

// GET estado
    async consultarPorEstado(req:Request, res:Response, next: NextFunction) {
        try {
            const { estado } = req.params;

            const pedidos = await PedidosModel.obtenerPorEstado(normalizarEnum (estado) as PedidoEstado);

            return res.status(200).json({
                total: pedidos.length,
                pedidos: pedidos
            });
            }catch(err){
                next(err); // lo maneja el middleware global de errores
            }
    }

//GET estadisticas
    async estadisticas(req:Request, res:Response, next: NextFunction) {
        try{
            const agrupadoPorEstado = await PedidosModel.obtenerEstadisticas();

            const estadisticasFormateadas = agrupadoPorEstado.map((grupo:any) => ({
                estado: grupo.estado,
                cantidad_pedidos: grupo._count.id_pedido,
                total_facturado: Number(grupo._sum.total || 0)
            }));
             return res.status(200).json({ estadisticas: estadisticasFormateadas });
        } catch (err) {
            next(err); // lo maneja el middleware global de errores
        }
    }
 //GET id
    async consultarDetalle(req:Request, res:Response, next: NextFunction) {
        try{
            const {id}=req.params;
            // El model trae el pedido con sus detalles y la info de cada producto
            const pedido = await PedidosModel.obtenerPorId(Number(id));

            if (!pedido) {
                return res.status(404).json({ error: 'Pedido no encontrado' });
            }

            return res.status(200).json(pedido);
        }catch(err){
            next(err); // lo maneja el middleware global de errores
        }
    }

// PUT
  async actualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req); // Filtra y extrae solo la info correspondiente a la cabecera

      const pedidoActualizado = await PedidosModel.actualizar(id, {
        id_cliente: data.id_cliente,
        id_empleado: data.id_empleado,
        id_compania: data.id_compania,
        estado: data.estado as PedidoEstado
      });

      return res.status(200).json({
        mensaje: 'Pedido actualizado con éxito',
        pedido: pedidoActualizado
      });
    } catch (err) {
      next(err);
    }
  }
/// PATCH
  async actualizarParcial(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req);

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron campos válidos para actualizar' });
      }

      const pedidoExistente = await PedidosModel.obtenerPorId(id);
      if (!pedidoExistente) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }

      const pedidoActualizado = await PedidosModel.actualizarParcial(id, data);
      return res.status(200).json({
        mensaje: 'Pedido actualizado con éxito',
        pedido: pedidoActualizado
      });
    } catch (err) {
      next(err);
    }
  }
   // DELETE (Se asume la lógica de cierre del método interrumpido)
    async eliminar(req:Request, res:Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            // Verificamos que el pedido exista antes de intentar borrarlo
            const pedidoExistente = await PedidosModel.obtenerPorId(id);

            if (!pedidoExistente) {
                return res.status(404).json({ error: 'Pedido no encontrado' });
            }

            await PedidosModel.eliminar(id);

            return res.status(200).json({ mensaje: 'Pedido eliminado con éxito' });

           }catch(err){
               next(err); // lo maneja el middleware global de errores
           }
    }
}
export default new PedidosController();
