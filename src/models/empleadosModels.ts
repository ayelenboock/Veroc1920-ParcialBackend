import { prisma } from "../config/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

class EmpleadosModel {
    async obtenerTodos() {
        return await prisma.empleado.findMany({ where: { activo: true } });//no lista a los dados de baja
    }

    // Filtrar: empleado de un puesto
    async obtenerPorPuesto(puesto: string) {
        return await prisma.empleado.findMany({
            where: {
                puesto: {
                    contains: puesto
                },
                activo: true
            }
        });
    }

    //Cantidad de pedido y total vendido por empleado (JOIN empleado -> pedido)
    async obtenerEstadisticas() {
        return await prisma.empleado.findMany({
            select: {
                id_empleado: true,
                nombre: true,
                apellido: true,
                puesto: true,
                pedidos: {
                    select: {
                        total: true
                    }
                }
            }
        });
    }

    async crear(datos: Prisma.EmpleadoUncheckedCreateInput) {
        return await prisma.empleado.create({
            data: datos
        });
    }

    async obtenerPorId(id: number) {
        return await prisma.empleado.findUnique({
            where: { id_empleado: id }
        });
    }

    async actualizar(id: number, datos: Prisma.EmpleadoUncheckedUpdateInput) {
        return await prisma.empleado.update({
            where: { id_empleado: id },
            data: datos
        });
    }

    // "Eliminar" da de baja el empleado, no lo elimina, se conserva el historial de pedidos:
    async eliminar(id: number) {
        return await prisma.empleado.update({
            where: { id_empleado: id },
            data: { activo: false }
        });
    }

    // Recibe solo los campos permitidos (el filtrado se hace en el controlador)
    async actualizarParcial(id: number, campos: Prisma.EmpleadoUncheckedUpdateInput) {
        return await prisma.empleado.update({
            where: { id_empleado: id },
            data: campos
        });
    }
}

export default new EmpleadosModel()
