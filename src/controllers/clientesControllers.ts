import type { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import type { Prisma } from '../generated/prisma/client.js';
import ClientesModel from '../models/clientesModels.js'
import type { ClienteCondicionIva } from '../generated/prisma/enums.js';
import { normalizarEnum } from '../utils/normalizarEnum.js';

class ClientesController {
    constructor (){}

    //GET
    async consultar(req:Request, res:Response, next: NextFunction) {
       try{
         const clientes= await ClientesModel.obtenerTodos();

         return res.status(200).json({
            total: clientes.length,
            clientes: clientes
          });

        }catch(err){
            next(err); // lo maneja el middleware global de errores
        }
    }


    //GET clientes filtrados por condición de IVA
async consultarPorCondicion(req: Request, res: Response, next: NextFunction) {
    try {
        const { condicion } = req.params;

        // Normalizamos el parámetro reemplazando guiones y forzando el tipo del Enum
        const condicionFormateada = normalizarEnum(condicion) as ClienteCondicionIva;

        // Consultamos filtrando por la condición de IVA (el model incluye los datos de la ciudad)
        const clientes = await ClientesModel.obtenerPorCondicion(condicionFormateada);

        return res.status(200).json({
            total: clientes.length,
            clientes: clientes
        });

    } catch (err) {
        next(err); // lo maneja el middleware global de errores
    }
}


    //GET estadísticas: pedidos y total comprado por cliente
    async estadisticas(req:Request, res:Response, next: NextFunction) {
       try{
        const resultado = await ClientesModel.obtenerEstadisticas();
        // Formateamos los datos calculando la cantidad de pedidos y el total sumado
        const estadisticasFormateadas = resultado.map((cliente:any) => {
            // Sumamos todos los totales de los pedidos del cliente
            const totalComprado = cliente.pedidos.reduce((acumulado:number, pedido:any) => {
                // Convertimos el tipo Decimal de Prisma a número estándar de JS
                return acumulado + Number(pedido.total);
            }, 0);

            return {
                id_cliente: cliente.id_cliente,
                nombre: cliente.nombre,
                apellido: cliente.apellido,
                cuit: cliente.cuit,
                cantidad_pedidos: cliente.pedidos.length, // Conteo de pedidos
                total_comprado: totalComprado // Suma total gastada
            };
        });
         return res.status(200).json({ estadisticasFormateadas });
        }catch(err){
            next(err); // lo maneja el middleware global de errores
        }
    }

    //POST
    async ingresar(req:Request,res:Response, next: NextFunction){
        try {
            // matchedData obtiene los campos limpios y validados del esquema
            const data = matchedData(req) as Prisma.ClienteUncheckedCreateInput;
      
            // Creamos el registro a través del model pasándole directamente la data sanitizada
            const nuevoCliente = await ClientesModel.crear({
            ...data,
            condicion_iva: data.condicion_iva as ClienteCondicionIva
            });
            // Prisma nos devuelve el objeto creado directamente con su 'id_cliente'
            return res.status(201).json({ 
                mensaje: 'Cliente creado con éxito', id: nuevoCliente.id_cliente });
            } catch (err) {
                next(err);
            }
        }

    //GET id
    async consultarDetalle(req:Request, res:Response, next: NextFunction) {
        try{
            const { id } = req.params;

            const cliente = await ClientesModel.obtenerPorId(Number(id));

            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }

            return res.status(200).json(cliente);
        }catch(err){
            next(err); // lo maneja el middleware global de errores
        }
    }
// PUT
  async actualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req); // Trae solo las columnas definidas en clienteValidation

      const clienteActualizado = await ClientesModel.actualizar(id, {
        ...data,
        condicion_iva: data.condicion_iva as ClienteCondicionIva
      });

      return res.status(200).json({ mensaje: 'Cliente actualizado con éxito', cliente: clienteActualizado });
    } catch (err) {
      next(err);
    }
  }

// PATCH
  async actualizarParcial(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req); // Solo contendrá las propiedades enviadas que pasaron el filtro

      // Validación por si envían un JSON vacío {} o con parámetros inválidos
      if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron campos válidos para actualizar' });
      }

      // Verificamos que el cliente exista
      const clienteExistente = await ClientesModel.obtenerPorId(id);
      if (!clienteExistente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      const clienteActualizado = await ClientesModel.actualizarParcial(id, data);
      return res.status(200).json({ mensaje: 'Cliente actualizado con éxito', cliente: clienteActualizado });
    } catch (err) {
      next(err);
    }
  }

    async eliminar(req:Request, res:Response, next: NextFunction) {
        try{
            const  id  = Number(req.params.id);

                        const clienteExistente = await ClientesModel.obtenerPorId(id);

                        if (!clienteExistente) {
                          return res.status(404).json({
                            error: 'Cliente no encontrada' });
                        }
                        await ClientesModel.eliminar(id);
                        return res.status(200).json({
                             mensaje: 'Clientes eliminada con éxito' });

           }catch(err){
               next(err); // lo maneja el middleware global de errores
           }
    }

}

export default new ClientesController();
