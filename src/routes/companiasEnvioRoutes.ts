import express from "express";
import { checkSchema } from "express-validator";
import companiasEnvioControllers from "../controllers/companiasEnvioControllers.js";
import { companiaEnvioValidation,patchCompaniaEnvioValidation } from "../utils/companiaEnvioValidationSchema.js";
import { validarCampos } from "../utils/validarCampos.js";
import validarId from "../middlewares/validarId.js";


const router = express.Router();

//Métodos GET
router.get('/', companiasEnvioControllers.consultar)
//Método POST
router.post('/',checkSchema(companiaEnvioValidation),validarCampos, companiasEnvioControllers.ingresar) 

//GET compañías por nombre
router.get('/buscar/:texto', companiasEnvioControllers.buscar)

//GET estadísticas
router.get('/estadisticas', companiasEnvioControllers.estadisticas)

//Métodos con /:id 
router.route('/:id')
 .all(validarId)
 .put(checkSchema(companiaEnvioValidation),validarCampos,companiasEnvioControllers.actualizar)  //Método  PUT

//Método Get id
 .get(companiasEnvioControllers.consultarDetalle)

//Método PATCH
 .patch(checkSchema(patchCompaniaEnvioValidation),validarCampos,companiasEnvioControllers.actualizarParcial )

//Método DELETE
 .delete(companiasEnvioControllers.eliminar)

export default router;