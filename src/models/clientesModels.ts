import { prisma } from "../config/prisma.js";
import type { Prisma, ClienteCondicionIva } from "../generated/prisma/client.js";

class ClientesModel {
    async obtenerTodos() {
        return await prisma.cliente.findMany({
            include: {
                ciudad: true //Método para traer la localidad, CP y provincia de cada cliente (JOIN)
            }
        });
            
    }

    async crear(datos: Prisma.ClienteUncheckedCreateInput) {
        return await prisma.cliente.create({
            data: datos
        });
    }

    //Filtrar clientes según su condición de IVA (JOIN con ciudades)
    async obtenerPorCondicion(condicion: ClienteCondicionIva) {
        return await prisma.cliente.findMany({
            where: {
                condicion_iva: condicion
            },
            include: {
                ciudad: true
            }
        });
    }

    //Cantidad de pedidos y total comprado por cliente (JOIN clientes -> pedidos)
    async obtenerEstadisticas() {
        return await prisma.cliente.findMany({
            select: {
                id_cliente: true,
                nombre: true,
                apellido: true,
                cuit: true,
                pedidos: {
                    select: {
                        total: true
                    }
                }
            }
        });
    }

    async obtenerPorId(id: number) {
        return await prisma.cliente.findUnique({
            where: { id_cliente: id },
            include: {
                ciudad: true
            }
        });
    }

    async actualizar(id: number, datos: Prisma.ClienteUncheckedUpdateInput) {
        return await prisma.cliente.update({
            where: { id_cliente: id },
            data: datos
        });
    }

    async eliminar(id: number) {
        return await prisma.cliente.delete({
            where: { id_cliente: id }
        });
    }

    // Recibe solo los campos permitidos (el filtrado se hace en el controlador)
    async actualizarParcial(id: number, campos: Prisma.ClienteUncheckedUpdateInput) {
        return await prisma.cliente.update({
            where: { id_cliente: id },
            data: campos
        });
    }
}

export default new ClientesModel()
