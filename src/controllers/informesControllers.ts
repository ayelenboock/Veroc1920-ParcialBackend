import type { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import InformesModel from '../models/informesModels.js';

class InformesController {
  constructor () { }

  // GET informe de ventas por categoría (SQL puro con $queryRaw)
  async ventasPorCategoria(req: Request, res: Response, next: NextFunction) {
    try {
      // matchedData obtiene automáticamente los strings validados o los valores por defecto del esquema
      const { desde, hasta } = matchedData(req, { locations: ['query'] });

      // Consultamos el modelo pasándole las fechas limpias y formateadas
      const filas = await InformesModel.ventasPorCategoria(desde, hasta);

      // Convertimos BigInt y Decimal a número agregando tipos explícitos para TypeScript
      const categorias = filas.map((fila: any) => ({
        id_categoria: fila.id_categoria,
        categoria: fila.categoria,
        cantidad_pedidos: Number(fila.cantidad_pedidos),
        unidades_vendidas: Number(fila.unidades_vendidas),
        total_facturado: Number(fila.total_facturado)
      }));

      // Totales generales del período calculados con acumuladores tipados
      const total_facturado = categorias.reduce((acumulado: number, cat: any) => acumulado + cat.total_facturado, 0);
      const total_unidades = categorias.reduce((acumulado: number, cat: any) => acumulado + cat.unidades_vendidas, 0);

      return res.status(200).json({
        informe: 'Ventas por categoría',
        periodo: { desde, hasta },
        total_facturado,
        total_unidades,
        categorias
      });
    } catch (err) {
      next(err); // Manejado por el middleware global de errores
    }
  }
}

export default new InformesController();
