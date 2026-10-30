import express from "express";
import { checkSchema } from "express-validator";
import ciudadesControllers from "../controllers/ciudadesControllers.js";
import { ciudadValidation,patchCiudadValidation } from "../utils/ciudadValidationSchema.js";
import { validarCampos } from "../utils/validarCampos.js";
import validarId from "../middlewares/validarId.js";


const router = express.Router();

//Métodos GET
router.get('/', ciudadesControllers.consultar)
//Método POST
router.post('/',checkSchema(ciudadValidation),validarCampos, ciudadesControllers.ingresar) 

//GET categorías por nombre
router.get('/buscar/:texto', ciudadesControllers.buscar)
//GET estadísticas
router.get('/estadisticas', ciudadesControllers.estadisticas)

//Métodos con /:id 
router.route('/:id')
 .all(validarId) //valida el id para PUT, GET, PATCH Y DELETE
 .put(checkSchema(ciudadValidation),validarCampos,ciudadesControllers.actualizar)  //Método  PUT

//Método Get id
 .get(ciudadesControllers.consultarDetalle)

//Método PATCH
 .patch(checkSchema(patchCiudadValidation),validarCampos,ciudadesControllers.actualizarParcial )

//Método DELETE
 .delete(ciudadesControllers.eliminar)

export default router;