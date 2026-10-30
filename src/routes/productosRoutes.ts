import express from "express";
import { checkSchema } from "express-validator";
import productosControllers from "../controllers/productosControllers.js";
import validarId from "../middlewares/validarId.js";
import { productoValidation,patchProductoValidation } from "../utils/productoValidationSchema.js";
import { validarCampos } from "../utils/validarCampos.js";

const router = express.Router();

//Métodos GET
router.get('/',productosControllers.consultar)
//Método POST
router.post('/',checkSchema(productoValidation),validarCampos,productosControllers.ingresar) 

//GET productos por categoría
router.get('/categoria/:id', validarId, productosControllers.consultarPorCategoria)

//GET estadísticas
router.get('/estadisticas', productosControllers.estadisticas)

//Métodos con /:id 
router.route('/:id')
 .all(validarId)
 .put(checkSchema(productoValidation),validarCampos,productosControllers.actualizar)  //Método  PUT

//Método Get id
 .get(productosControllers.consultarDetalle)

//Método PATCH
 .patch(checkSchema(patchProductoValidation),validarCampos,productosControllers.actualizarParcial)

//Método DELETE
 .delete(productosControllers.eliminar)

export default router;