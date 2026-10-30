import express from "express";
import clientesControllers from "../controllers/clientesControllers.js";
import validarId from "../middlewares/validarId.js";
import { checkSchema } from "express-validator";
import { clienteValidation, patchClienteValidation } from "../utils/clienteValidationSchema.js";
import { validarCampos } from "../utils/validarCampos.js";


const router = express.Router();

//Métodos GET
router.get('/', clientesControllers.consultar);
//GET clientes por condición de IVA
router.get('/condicion/:condicion', clientesControllers.consultarPorCondicion);
//GET estadísticas
router.get('/estadisticas', clientesControllers.estadisticas);

//Método POST
router.post('/', checkSchema(clienteValidation),validarCampos,clientesControllers.ingresar);

//Métodos con /:id 
router.route('/:id')
 .all(validarId) //valida id
 .put(checkSchema(clienteValidation),validarCampos,clientesControllers.actualizar)  //Método  PUT

//Método Get id
 .get(clientesControllers.consultarDetalle)

//Método PATCH
 .patch(checkSchema(patchClienteValidation),validarCampos,clientesControllers.actualizarParcial)

//Método DELETE
 .delete(clientesControllers.eliminar)

export default router;