import type { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import EmpleadosModel from '../models/empleadosModels.js';
class EmpleadosController {
    constructor (){}

    //GET
    async consultar(req:Request, res:Response, next: NextFunction) {
        try{
            const empleados = await EmpleadosModel.obtenerTodos();

            return res.status(200).json({
                total: empleados.length,
                empleados: empleados
            });
            }catch(err){
                next(err); // lo maneja el middleware global de errores
            }
       }

    //GET empleados filtrados por puesto
    async consultarPorPuesto(req:Request, res:Response, next: NextFunction) {
        try{
            const {puesto}= req.params;
            const empleados = await EmpleadosModel.obtenerPorPuesto(String(puesto));
            return res.status(200).json({
                total: empleados.length,
                 empleados: empleados
                 });
            }catch(err){
                next(err); // lo maneja el middleware global de errores
            }
      }

    //GET estadísticas: pedidos y total vendido por empleado
    async estadisticas(req:Request, res:Response, next: NextFunction) {
       try {
            // Traemos los empleados junto a sus pedidos asociados
            const resultado = await EmpleadosModel.obtenerEstadisticas();

            // Formateamos las estadísticas sumando las ventas
            const estadisticasFormateadas = resultado.map((empleado:any) => {
                const totalVendido = empleado.pedidos.reduce((acumulado:number, pedido:any) => {
                    return acumulado + Number(pedido.total);
                }, 0);

                return {
                    id_empleado: empleado.id_empleado,
                    nombre: empleado.nombre,
                    apellido: empleado.apellido,
                    puesto: empleado.puesto,
                    cantidad_pedidos: empleado.pedidos.length,
                    total_vendido: totalVendido
                };
            });

             res.status(200).json({ estadisticasFormateadas });
        }catch(err){
            next(err); // lo maneja el middleware global de errores
        }
    }

// POST
  async ingresar(req: Request, res: Response, next: NextFunction) {
    try {
      // matchedData obtiene la información limpia. Las fechas ya son instancias de Date por 'toDate'
      const data = matchedData(req);

      const nuevoEmpleado = await EmpleadosModel.crear(data);

      return res.status(201).json({
        mensaje: 'Empleado creado con éxito',
        id: nuevoEmpleado.id_empleado
      });
    } catch (err) {
      next(err);
    }
  }

    //GET id
    async consultarDetalle(req:Request, res:Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const empleado = await EmpleadosModel.obtenerPorId(Number(id));

            if (!empleado) {
                return res.status(404).json({ error: 'Empleado no encontrado' });
            }

            return res.status(200).json(empleado);
          }catch(err){
              next(err); // lo maneja el middleware global de errores
          }
     }
// PUT
  async actualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req);

      const empleadoActualizado = await EmpleadosModel.actualizar(id, data);

      return res.status(200).json({
        mensaje: 'Empleado actualizado con éxito',
        empleado: empleadoActualizado
      });
    } catch (err) {
      next(err);
    }
  }
// PATCH
  async actualizarParcial(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req); // Contiene únicamente los campos enviados y validados

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron campos válidos para actualizar' });
      }

      // Verificamos que el empleado exista
      const empleadoExistente = await EmpleadosModel.obtenerPorId(id);
      if (!empleadoExistente) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }

      const empleadoActualizado = await EmpleadosModel.actualizarParcial(id, data);

      return res.status(200).json({
        mensaje: 'Empleado actualizado con éxito',
        empleado: empleadoActualizado
      });
    } catch (err) {
      next(err);
    }
  }
    async eliminar(req:Request, res:Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            // Verificamos que el empleado exista antes de intentar borrarlo
            const empleadoExistente = await EmpleadosModel.obtenerPorId(id);

            if (!empleadoExistente || !empleadoExistente.activo) {
                return res.status(404).json({ error: 'Empleado no encontrado' });
            }

            await EmpleadosModel.eliminar(id);

            return res.status(200).json({ mensaje: 'Empleado dado de baja con éxito' });

           }catch(err){
               next(err); // lo maneja el middleware global de errores
           }
    }
}
export default new EmpleadosController();
