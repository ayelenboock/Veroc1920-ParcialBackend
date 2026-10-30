import express from "express";
import { checkSchema } from "express-validator";
import empleadosControllers from "../controllers/empleadosControllers.js"; 
import { empleadoValidation,patchEmpleadoValidation } from "../utils/empleadoValidationSchema.js";
import validarId from "../middlewares/validarId.js";
import { validarCampos } from "../utils/validarCampos.js";
const router = express.Router();

//Métodos GET
router.get('/', empleadosControllers.consultar)
//GET empleados por puesto
router.get('/puesto/:puesto', empleadosControllers.consultarPorPuesto)

//GET estadísticas
router.get('/estadisticas', empleadosControllers.estadisticas)

//Método POST
router.post('/',checkSchema(empleadoValidation),validarCampos, empleadosControllers.ingresar) 


//Métodos con /:id 
router.route('/:id')
 .all(validarId)
 .put(checkSchema(empleadoValidation),validarCampos,empleadosControllers.actualizar)  //Método  PUT

//Método Get id
 .get(empleadosControllers.consultarDetalle)

//Método PATCH
 .patch(checkSchema(patchEmpleadoValidation),validarCampos,empleadosControllers.actualizarParcial)

//Método DELETE
 .delete(empleadosControllers.eliminar)

export default router;