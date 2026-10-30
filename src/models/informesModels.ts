import { prisma } from "../config/prisma.js";

//Informe de ventas por categoría en un periodo determinado. Devuelve para cada categoría
//la cantidad de pedidos, las unidades vendidas y el total facturado, con un filtro
//opcional de fechas.

// Tipo de cada fila que devuelve la consulta SQL
// (COUNT llega como BigInt y SUM como Decimal, por eso se convierten en el controlador)
type FilaVentasPorCategoria = {
    id_categoria: number;
    categoria: string;
    cantidad_pedidos: bigint;
    unidades_vendidas: unknown;
    total_facturado: unknown;
};

class InformesModel {
    // Informe con SQL puro: ventas por categoría en un rango de fechas.
    // Se usa $queryRaw con template literal: los valores ${desde} y ${hasta}
    // viajan como parámetros de una consulta preparada, nunca concatenados al SQL.
    async ventasPorCategoria(desde: string, hasta: string) {
        return await prisma.$queryRaw<FilaVentasPorCategoria[]>`
            SELECT c.id_categoria,
                   c.nombre                            AS categoria,
                   COUNT(DISTINCT p.id_pedido)         AS cantidad_pedidos,
                   SUM(d.cantidad)                     AS unidades_vendidas,
                   SUM(d.cantidad * d.precio_unitario) AS total_facturado
            FROM detalles_pedidos d
            JOIN productos  pr ON pr.id_producto  = d.id_producto
            JOIN categorias c  ON c.id_categoria  = pr.id_categoria
            JOIN pedidos    p  ON p.id_pedido     = d.id_pedido
            WHERE p.estado <> 'Cancelado'
              AND p.fecha >= ${desde}
              AND p.fecha <  DATE_ADD(${hasta}, INTERVAL 1 DAY)
            GROUP BY c.id_categoria, c.nombre
            ORDER BY total_facturado DESC
        `;
    }
}

export default new InformesModel()
