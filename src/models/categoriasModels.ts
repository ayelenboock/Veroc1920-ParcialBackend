import { prisma } from "../config/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

class CategoriasModel {
    async obtenerTodos() {
        return await prisma.categoria.findMany();
    }

    // Filtrar categorías por nombre
    async buscarPorNombre(texto: string) {
        return await prisma.categoria.findMany({
            where: {
                nombre: {
                    contains: texto
                }
            }
        });
    }

    //Unidades vendidas por categoría (JOIN categorias -> productos -> detalles_pedidos)
    async obtenerEstadisticas() {
        return await prisma.categoria.findMany({
            select: {
                id_categoria: true,
                nombre: true,
                productos: {
                    select: {
                        detalles: {
                            select: {
                                cantidad: true
                            }
                        }
                    }
                }
            }
        });
    }

    async crear(datos: Prisma.CategoriaUncheckedCreateInput) {
        return await prisma.categoria.create({
            data: datos
        });
    }

    async obtenerPorId(id: number) {
        return await prisma.categoria.findUnique({
            where: { id_categoria: id }
        });
    }

    async actualizar(id: number, datos: Prisma.CategoriaUncheckedUpdateInput) {
        return await prisma.categoria.update({
            where: { id_categoria: id },
            data: datos
        });
    }

    async eliminar(id: number) {
        return await prisma.categoria.delete({
            where: { id_categoria: id }
        });
    }

    // Recibe solo los campos permitidos (el filtrado se hace en el controlador)
    async actualizarParcial(id: number, campos: Prisma.CategoriaUncheckedUpdateInput) {
        return await prisma.categoria.update({
            where: { id_categoria: id },
            data: campos
        });
    }
}

export default new CategoriasModel()
