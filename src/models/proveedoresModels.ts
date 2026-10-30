import { prisma } from "../config/prisma.js";
import type { Prisma, ProveedorCondicionIva } from "../generated/prisma/client.js";

class ProveedoresModel {
    async obtenerTodos() {
        return await prisma.proveedor.findMany();
    }

    // Filtrar proveedores según su condición de IVA
    async obtenerPorCondicion(condicion: ProveedorCondicionIva) {
        return await prisma.proveedor.findMany({
            where: {
                condicion_iva: condicion
            }
        });
    }

    //Cantidad de productos y stock por proveedor (JOIN proveedores -> productos)
    async obtenerEstadisticas() {
        return await prisma.proveedor.findMany({
            select: {
                id_proveedor: true,
                razon_social: true,
                productos: {
                    select: {
                        stock: true
                    }
                }
            }
        });
    }

    async crear(datos: Prisma.ProveedorUncheckedCreateInput) {
        return await prisma.proveedor.create({
            data: datos
        });
    }

    async obtenerPorId(id: number) {
        return await prisma.proveedor.findUnique({
            where: { id_proveedor: id }
        });
    }

    async actualizar(id: number, datos: Prisma.ProveedorUncheckedUpdateInput) {
        return await prisma.proveedor.update({
            where: { id_proveedor: id },
            data: datos
        });
    }

    async eliminar(id: number) {
        return await prisma.proveedor.delete({
            where: { id_proveedor: id }
        });
    }

    // Recibe solo los campos permitidos (el filtrado se hace en el controlador)
    async actualizarParcial(id: number, campos: Prisma.ProveedorUncheckedUpdateInput) {
        return await prisma.proveedor.update({
            where: { id_proveedor: id },
            data: campos
        });
    }
}

export default new ProveedoresModel()
