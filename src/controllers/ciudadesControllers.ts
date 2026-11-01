import type { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import type { Prisma } from "../generated/prisma/client.js";
import CiudadesModel from "../models/ciudadesModels.js";

class CiudadesController {
  constructor() {}
  //Creamos los métodos para reemplazar las funciones en Routes
  //GET
  async consultar(req: Request, res: Response, next: NextFunction) {
    try {
      const ciudades = await CiudadesModel.obtenerTodos();
      return res.status(200).json({
        total: ciudades.length,
        ciudades: ciudades,
      });
    } catch (err) {
      next(err); // lo maneja el middleware global de errores
    }
  }

  //GET categorías por nombre
  async buscar(req: Request, res: Response, next: NextFunction) {
    try {
      const { texto } = req.params;
      const result = await CiudadesModel.buscarPorNombre(String(texto));
      return res.status(200).json({
        total: result.length,
        ciudades: result,
      });
    } catch (err) {
      next(err); // lo maneja el middleware global de errores
    }
  }

  //GET estadísticas: unidades vendidas por ciudad
  async estadisticas(req: Request, res: Response, next: NextFunction) {
    try {
      const resultado = await CiudadesModel.obtenerEstadisticas();

      // para retornar el objeto en el .map()
      const estadisticasFormateadas = resultado.map((ciudad: any) => ({
        id_ciudad: ciudad.id_ciudad,
        nombre: ciudad.nombre,
        total_clientes: ciudad._count.clientes,
      }));

      return res.status(200).json({ estadisticas: estadisticasFormateadas });
    } catch (err) {
      next(err); // lo maneja el middleware global de errores
    }
  }

  // POST
  async ingresar(req: Request, res: Response, next: NextFunction) {
    try {
      const data = matchedData(req) as Prisma.CiudadUncheckedCreateInput;

      const nuevaCiudad = await CiudadesModel.crear(data);

      return res.status(201).json({
        mensaje: "Ciudad creada con éxito",
        id: nuevaCiudad.id_ciudad,
      });
    } catch (err) {
      next(err);
    }
  }

  //GET id
  async consultarDetalle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const ciudad = await CiudadesModel.obtenerPorId(Number(id));

      if (!ciudad) {
        return res.status(404).json({ error: "Ciudad no encontrada" });
      }

      return res.status(200).json(ciudad);
    } catch (err) {
      next(err); // lo maneja el middleware global de errores
    }
  }
  // PUT
  async actualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req);

      const ciudadExiste = await CiudadesModel.obtenerPorId(id);
      if (!ciudadExiste) {
        return res.status(404).json({ error: "Ciudad no encontrada" });
      }

      const ciudadActualizada = await CiudadesModel.actualizar(id, data);

      return res.status(200).json({
        mensaje: "Ciudad actualizada con éxito",
        ciudad: ciudadActualizada,
      });
    } catch (err) {
      next(err);
    }
  }

  // PATCH
  async actualizarParcial(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = matchedData(req);

      if (Object.keys(data).length === 0) {
        return res.status(400).json({
          error: "No se proporcionaron campos válidos para actualizar",
        });
      }

      const ciudadExiste = await CiudadesModel.obtenerPorId(id);
      if (!ciudadExiste) {
        return res.status(404).json({ error: "Ciudad no encontrada" });
      }

      const ciudadActualizada = await CiudadesModel.actualizarParcial(id, data);
      return res.status(200).json({
        mensaje: "Ciudad actualizada con éxito",
        ciudad: ciudadActualizada,
      });
    } catch (err) {
      next(err);
    }
  }

  async eliminar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const ciudadExiste = await CiudadesModel.obtenerPorId(id);

      if (!ciudadExiste) {
        return res.status(404).json({
          error: "Ciudad no encontrada",
        });
      }
      await CiudadesModel.eliminar(id);
      return res.status(200).json({
        mensaje: "Ciudad eliminada con éxito",
      });
    } catch (err) {
      next(err); // lo maneja el middleware global de errores
    }
  }
}

export default new CiudadesController();
