import express from "express";
import { checkSchema } from "express-validator";
import categoriasControllers from "../controllers/categoriasControllers.js";
import { categoriaValidation,patchCategoriaValidation } from "../utils/categoriaValidationSchema.js";
import { validarCampos } from "../utils/validarCampos.js";
import validarId from "../middlewares/validarId.js";


const router = express.Router();

//Métodos GET
router.get('/', categoriasControllers.consultar)
//Método POST
router.post('/', checkSchema(categoriaValidation),validarCampos,categoriasControllers.ingresar) 

//GET categorías por nombre
router.get('/buscar/:texto', categoriasControllers.buscar)
//GET estadísticas
router.get('/estadisticas', categoriasControllers.estadisticas)

//Métodos con /:id 
router.route('/:id')
 .all(validarId)   // valida el id para PUT, GET, PATCH y DELETE
 .put(checkSchema(categoriaValidation),validarCampos,categoriasControllers.actualizar)  //Método  PUT

//Método Get id
 .get(categoriasControllers.consultarDetalle)

//Método PATCH
 .patch(checkSchema(patchCategoriaValidation),validarCampos,categoriasControllers.actualizarParcial )

//Método DELETE
 .delete(categoriasControllers.eliminar)

export default router;