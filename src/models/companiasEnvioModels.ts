import { prisma } from "../config/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

class CompaniasEnvioModel {
    async obtenerTodos() {
        return await prisma.companiaEnvio.findMany();
    }

    // Filtrar compañías por nombre
    async buscarPorNombre(texto: string) {
        return await prisma.companiaEnvio.findMany({
            where: {
                nombre: {
                    contains: texto
                }
            }
        });
    }

    //Cantidad de envíos por compañía
    async obtenerEstadisticas() {
        return await prisma.companiaEnvio.findMany({
            select: {
                id_compania: true,
                nombre: true,
                _count: {
                    select: {
                        pedidos: true // Cuenta cuántos pedidos fueron enviados por esta compañía
                    }
                }
            }
        });
    }

    async crear(datos: Prisma.CompaniaEnvioUncheckedCreateInput) {
        return await prisma.companiaEnvio.create({
            data: datos
        });
    }

    // Trae la compañía junto con los datos de su ciudad (JOIN)
    async obtenerPorId(id: number) {
        return await prisma.companiaEnvio.findUnique({
            where: { id_compania: id },
            include: {
                ciudad: true
            }
        });
    }

    async actualizar(id: number, datos: Prisma.CompaniaEnvioUncheckedUpdateInput) {
        return await prisma.companiaEnvio.update({
            where: { id_compania: id },
            data: datos
        });
    }

    async eliminar(id: number) {
        return await prisma.companiaEnvio.delete({
            where: { id_compania: id }
        });
    }

    // Recibe solo los campos permitidos (el filtrado se hace en el controlador)
    async actualizarParcial(id: number, campos: Prisma.CompaniaEnvioUncheckedUpdateInput) {
        return await prisma.companiaEnvio.update({
            where: { id_compania: id },
            data: campos
        });
    }
}

export default new CompaniasEnvioModel()
