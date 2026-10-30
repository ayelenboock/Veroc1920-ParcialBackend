import { prisma } from "../config/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

class CiudadesModel {
    async obtenerTodos() {
        return await prisma.ciudad.findMany();
    }

    // Filtrar ciudad por nombre
    async buscarPorNombre(texto: string) {
        return await prisma.ciudad.findMany({
            where: {
                nombre: {
                    contains: texto
                }
            }
        });
    }

    //Cantidad de clientes por ciudad
    async obtenerEstadisticas() {
        return await prisma.ciudad.findMany({
            select: {
                id_ciudad: true,
                nombre: true,
                _count: {
                    select: {
                        clientes: true // Cuenta cuántos clientes pertenecen a esta ciudad
                    }
                }
            }
        });
    }

    async crear(datos: Prisma.CiudadUncheckedCreateInput) {
        return await prisma.ciudad.create({
            data: datos
        });
    }

    async obtenerPorId(id: number) {
        return await prisma.ciudad.findUnique({
            where: { id_ciudad: id }
        });
    }

    async actualizar(id: number, datos: Prisma.CiudadUncheckedUpdateInput) {
        return await prisma.ciudad.update({
            where: { id_ciudad: id },
            data: datos
        });
    }

    async eliminar(id: number) {
        return await prisma.ciudad.delete({
            where: { id_ciudad: id }
        });
    }

    // Recibe solo los campos permitidos (el filtrado se hace en el controlador)
    async actualizarParcial(id: number, campos: Prisma.CiudadUncheckedUpdateInput) {
        return await prisma.ciudad.update({
            where: { id_ciudad: id },
            data: campos
        });
    }
}

export default new CiudadesModel()
