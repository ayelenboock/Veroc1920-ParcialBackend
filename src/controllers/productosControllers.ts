import type { Request,  Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import type { Prisma } from '../generated/prisma/client.js';
import ProductosModel from '../models/productosModels.js';
class ProductosController {
    constructor () { }

//GET
    async consultar(req:Request, res:Response, next: NextFunction) {
         try {
            // El model trae cada producto con su categoría y proveedor (JOIN)
            const productos = await ProductosModel.obtenerTodos();

            return res.status(200).json({
                total: productos.length,
                productos: productos
            });
        } catch (err) {
            next(err); // lo maneja el middleware global de errores
        }
    }

//GET productos filtrados por categoría
    async consultarPorCategoria(req:Request, res:Response, next: NextFunction) {
        try {
            const id_cat = Number(req.params.id);

            const productos = await ProductosModel.obtenerPorCategoria(id_cat);

            return res.status(200).json({
                total: productos.length,
                productos: productos
            });
           }catch(err){
               next(err); // lo maneja el middleware global de errores
           }
    }

//GET estadísticas por categoría
    async estadisticas(req:Request, res:Response, next: NextFunction) {
    try {
            // Agrupamos los productos por categoría calculando stock total y precio promedio
            const agrupado = await ProductosModel.obtenerEstadisticas();
            // Añadimos tipo explícito (grupo: any) para evitar errores implícitos de TS
            const estadisticasFormateadas = agrupado.map((grupo:any) => ({
                id_categoria: grupo.id_categoria,
                total_productos: grupo._count.id_producto,
                stock_total: grupo._sum.stock || 0,
                precio_promedio: Number(grupo._avg.precio || 0)
            }));

            return res.status(200).json({ estadisticas: estadisticasFormateadas });

            }catch(err){
                next(err); // lo maneja el middleware global de errores
            }
    }

// POST
  async ingresar(req: Request, res: Response, next: NextFunction) {
    try {
      const data = matchedData(req) as Prisma.ProductoUncheckedCreateInput;

      // Si el stock no se envía en el body, express-validator lo excluirá, asignamos 0 por defecto
      const nuevoProducto = await ProductosModel.crear({
        ...data,
        stock: data.stock !== undefined ? data.stock : 0
      });

      return res.status(201).json({
        mensaje: 'Producto creado con éxito',
        id: nuevoProducto.id_producto
      });
    } catch (err) {
      next(err);
    }
  }


 //GET id
    async consultarDetalle(req:Request, res:Response, next: NextFunction) {
        try {
            const { id } = req.params;

            // El model incluye la info de la categoría y del proveedor vinculados
            const producto = await ProductosModel.obtenerPorId(Number(id));

            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            return res.status(200).json(producto);
            }catch(err){
                next(err); // lo maneja el middleware global de errores
            }
    }
 // PUT
  async actualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req);

      const productoActualizado = await ProductosModel.actualizar(id, data);

      return res.status(200).json({
        mensaje: 'Producto actualizado con éxito',
        producto: productoActualizado
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

      // Verificamos que el producto exista
      const productoExistente = await ProductosModel.obtenerPorId(id);
      if (!productoExistente) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      const productoActualizado = await ProductosModel.actualizarParcial(id, data);

      return res.status(200).json({
        mensaje: 'Producto actualizado con éxito',
        producto: productoActualizado
      });
    } catch (err) {
      next(err);
    }
  }
    async eliminar(req:Request, res:Response, next: NextFunction) {
         try{
            const  id  = Number(req.params.id);

                        const productoExistente = await ProductosModel.obtenerPorId(id);

                        if (!productoExistente) {
                          return res.status(404).json({
                            error: 'Producto no encontrada' });
                        }
                        await ProductosModel.eliminar(id);
                        return res.status(200).json({
                             mensaje: 'Productos eliminada con éxito' });

               }catch(err){
                   next(err); // lo maneja el middleware global de errores
               }
        }

}

export default new ProductosController();
