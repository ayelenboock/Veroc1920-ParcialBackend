import type { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import CategoriasModel from '../models/categoriasModels.js';


class CategoriasController {
    constructor () { }
//Creamos los métodos para reemplazar las funciones en Routes
//GET
    async consultar(req: Request, res: Response, next: NextFunction) {
        try{
            const categorias = await CategoriasModel.obtenerTodos();

            return res.status(200).json({
                total: categorias.length,
                categorias: categorias
            });
        }catch(err){
            next(err); // lo maneja el middleware global de errores
        }
    }

//GET categorías por nombre
    async buscar(req:Request, res:Response, next: NextFunction) {
        try{
            const { texto }=req.params;
        const result = await CategoriasModel.buscarPorNombre(String(texto))
        
        return res.status(200).json({ 
            total: result.length, 
            categorias: result 
        });
    }catch(err){
        next(err); // lo maneja el middleware global de errores
    }
    }

    //GET estadísticas: unidades vendidas por categoría
    async estadisticas(req:Request, res:Response, next: NextFunction) {
        try{
            const resultado = await CategoriasModel.obtenerEstadisticas();
            //formatear los datos para que devuelva la categoria junto al total de unidades sumadas
            const estadisticasFormateadas = resultado.map((cat:any) => {
                 // Sumamos todas las cantidades de todos los productos de esta categoría
            const unidadesVendidas = cat.productos.reduce((totalProd:number, prod:any) => {
                const totalDetalles = prod.detalles.reduce((totalDet:number, det:any) => totalDet + det.cantidad, 0);
                return totalProd + totalDetalles;
            }, 0);

            return {
                id_categoria: cat.id_categoria,
                nombre: cat.nombre,
                unidades_vendidas: unidadesVendidas
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
      // Extrae únicamente nombre y descripcion validados
      const data = matchedData(req) as { nombre: string; descripcion: string };
      const nuevaCategoria = await CategoriasModel.crear(data);
      return res.status(201).json({
        mensaje: 'Categoría creada con éxito',
        id: nuevaCategoria.id_categoria
      });
    } catch (err) {
      next(err);
    }
  }

 //GET id
    async consultarDetalle(req:Request, res:Response, next: NextFunction) {
        try{
            const { id } = req.params;

        const categoria = await CategoriasModel.obtenerPorId(Number(id));
        //si prisma no encuentra el registro, devuelve un null
        if (!categoria) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        //devolver el objeto directamente
        return res.status(200).json(categoria);
        }catch(err){
            next(err); // lo maneja el middleware global de errores
        }
    }
// PUT
  async actualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
    
      const data = matchedData(req) as { nombre: string; descripcion: string };

      const categoriaExistente = await CategoriasModel.obtenerPorId(id);
      if (!categoriaExistente) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }

      const categoriaActualizado = await CategoriasModel.actualizar(id, data);
      return res.status(200).json({
        mensaje: 'Categoría actualizada con éxito',
        categoria: categoriaActualizado
      });
    } catch (err) {
      next(err);
    }
  }
// PATCH
  async actualizarParcial(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req) as { nombre: string; descripcion: string };

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron campos válidos para actualizar' });
      }

      const categoriaExistente = await CategoriasModel.obtenerPorId(id);
      if (!categoriaExistente) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }

      const categoriaActualizada = await CategoriasModel.actualizarParcial(id, data);
      return res.status(200).json({
        mensaje: 'Categoría actualizada con éxito',
        categoria: categoriaActualizada
      });
    } catch (err) {
      next(err);
    }
  }

    async eliminar(req:Request, res:Response, next: NextFunction) {
        try{
            const  id  = Number(req.params.id);
            //verificamos si la categoria existe antes de intentar borrarlo
            const categoriaExistente = await CategoriasModel.obtenerPorId(id);

            if (!categoriaExistente) {
              return res.status(404).json({
                 error: 'Categoría no encontrada' });
            }
            //si existe, lo eliminamos de la base de datos
            await CategoriasModel.eliminar(id);
            //devolvemos un mensaje de exito

            return res.status(200).json({
                 mensaje: 'Categoría eliminada con éxito' });
            }catch(err){
                next(err); // lo maneja el middleware global de errores
            }
        
    }

}
export default new CategoriasController()