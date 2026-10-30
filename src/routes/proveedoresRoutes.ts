import express from "express";
import { checkSchema } from "express-validator";
import ProveedoresController from "../controllers/proveedoresControllers.js";
import { proveedorValidation,patchProveedorValidation } from "../utils/proveedorValidationSchema.js";
import { validarCampos } from "../utils/validarCampos.js";
import validarId from "../middlewares/validarId.js";

const router = express.Router();

//Métodos GET
router.get('/', ProveedoresController.consultar)
//Método POST
router.post('/',checkSchema(proveedorValidation),validarCampos, ProveedoresController.ingresar) 

//GET proveedores por condición de IVA
router.get('/condicion/:condicion', ProveedoresController.consultarPorCondicion)

//GET estadísticas
router.get('/estadisticas', ProveedoresController.estadisticas)

//Métodos con /:id 
router.route('/:id')
 .all(validarId)
 .put(checkSchema(proveedorValidation),validarCampos,ProveedoresController.actualizar)  //Método  PUT

//Método Get id
 .get(ProveedoresController.consultarDetalle)

//Método PATCH
 .patch(checkSchema(patchProveedorValidation),validarCampos,ProveedoresController.actualizarParcial)

//Método DELETE
 .delete(ProveedoresController.eliminar)

export default router;