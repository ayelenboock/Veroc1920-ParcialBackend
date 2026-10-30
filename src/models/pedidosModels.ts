import { prisma } from "../config/prisma.js";
import type { Prisma, PedidoEstado } from "../generated/prisma/client.js";
import { crearError } from "../utils/crearError.js";

//Tipos auxiliares para crear un pedido con sus detalles:
type ItemPedido = { id_producto: number; cantidad: number };
type CabeceraPedido = { id_cliente: number; id_empleado: number; id_compania: number; estado?: PedidoEstado };

class PedidosModel {
    // Trae los pedidos con los datos del cliente, empleado y compañía (JOIN)
    async obtenerTodos() {
        return await prisma.pedido.findMany({
            include: {
                cliente: true,
                empleado: true,
                compania_envio: true
            }
        });
    }

    async crear(datos: Prisma.PedidoUncheckedCreateInput) {
        return await prisma.pedido.create({
            data: datos
        });
    }

    //Crea el pedido completo (cabecera y detalles) en una transacción:
    async crearConDetalle(cabecera: CabeceraPedido, items: ItemPedido[]) {
        return await prisma.$transaction(async (tx) => {
            const empleado = await tx.empleado.findUnique({
                where: { id_empleado: cabecera.id_empleado }
            }); //para que no se pueda asignar un pedido a un empleado inexistente o no activo:
            if (!empleado || !empleado.activo) {
                throw crearError(400, 'El empleado no existe o fue dado de baja');
            }

            let total = 0;
            const detalles = [];

            for (const item of items) {
                const producto = await tx.producto.findUnique({
                    where: { id_producto: item.id_producto }
                });
                if (!producto) throw crearError(404, `El producto ${item.id_producto} no existe` );
                if (producto.stock < item.cantidad) {
                    throw crearError(400, `Stock insuficiente para "${producto.nombre_producto}" (disponible: ${producto.stock})`);
                }

                //Descontar el stock:
                await tx.producto.update({
                    where: { id_producto: item.id_producto },
                    data: { stock: { decrement: item.cantidad } }
                });

                //El precio lo toma el servidor, no el cliente, para evitar mandar precios falsos:
                total += Number(producto.precio) * item.cantidad;
                detalles.push({
                    id_producto: item.id_producto,
                    cantidad: item.cantidad,
                    precio_unitario: producto.precio
                });
            }

            return await tx.pedido.create({
                data: {
                    ...cabecera,
                    total: Math.round(total * 100) / 100,
                    detalles: { create: detalles } //crea los detalles junto con el pedido
                },
                include: { detalles: {include: { producto: true } } }
            });
        });
    }

    //Agrega un producto a un pedido existente y recalcula el total:
    async agregarDetalle(id_pedido: number, item: ItemPedido) {
        return await prisma.$transaction(async (tx) => {
            const pedido = await tx.pedido.findUnique({ where: { id_pedido } });
            if (!pedido) throw crearError(404, 'Pedido no encontrado');
            if (pedido.estado !== 'Pendiente') {
                throw crearError(400, 'Solo se pueden agregar productos a pedidos en estado Pendiente');
            }

            const producto = await tx.producto.findUnique({ where: { id_producto: item.id_producto } });
            if (!producto) throw crearError(404, 'Producto no encontrado');
            if (producto.stock < item.cantidad) {
                throw crearError(400, `Stock insuficiente (disponible: ${producto.stock})`);
            }

            await tx.producto.update({
                where: { id_producto: item.id_producto },
                data: { stock: {decrement: item.cantidad }}
            });
            
            const detalle = await tx.detallePedido.create({
                data:{
                    id_pedido,
                    id_producto: item.id_producto,
                    cantidad: item.cantidad,
                    precio_unitario: producto.precio
                }
            });

            await tx.pedido.update({
                where: { id_pedido },
                data: { total: { increment: Number(producto.precio) * item.cantidad } }
            });
            
            return detalle;
        })
    }



    // Filtro para obtener pedidos por estado
    async obtenerPorEstado(estado: PedidoEstado) {
        return await prisma.pedido.findMany({
            where: {
                estado: estado
            }
        });
    }

    // Agregación: cantidad de pedidos y total facturado por estado
    async obtenerEstadisticas() {
        return await prisma.pedido.groupBy({
            by: ['estado'],
            _count: {
                id_pedido: true
            },
            _sum: {
                total: true
            }
        });
    }

    // Trae el pedido con sus detalles y los productos de cada detalle (JOIN)
    async obtenerPorId(id: number) {
        return await prisma.pedido.findUnique({
            where: { id_pedido: id },
            include: {
                detalles: {
                    include: {
                        producto: true
                    }
                }
            }
        });
    }

    async actualizar(id: number, datos: Prisma.PedidoUncheckedUpdateInput) {
        return await prisma.pedido.update({
            where: { id_pedido: id },
            data: datos
        });
    }

    async eliminar(id: number) {
        return await prisma.pedido.delete({
            where: { id_pedido: id }
        });
    }

    // Recibe solo los campos permitidos (el filtrado se hace en el controlador)
    async actualizarParcial(id: number, campos: Prisma.PedidoUncheckedUpdateInput) {
        return await prisma.pedido.update({
            where: { id_pedido: id },
            data: campos
        });
    }
}

export default new PedidosModel()
