import express from "express";
import { checkSchema } from "express-validator";
import pedidosControllers from "../controllers/pedidosControllers.js";
import { pedidoValidation, putPedidoValidation, patchPedidoValidation, agregarDetalleValidation } from "../utils/pedidoValidationSchema.js";
import { validarCampos } from "../utils/validarCampos.js";
import validarId from "../middlewares/validarId.js";


const router = express.Router();

//Métodos GET
router.get('/', pedidosControllers.consultar)
//Método POST
router.post('/', checkSchema(pedidoValidation),validarCampos,pedidosControllers.ingresar)
router.post('/:id/detalles', checkSchema(agregarDetalleValidation),validarCampos,validarId, pedidosControllers.agregarDetalle)

//Métodos GET por estado
router.get('/estado/:estado', pedidosControllers.consultarPorEstado)

//Métodos GET estadisticas
router.get('/estadisticas', pedidosControllers.estadisticas)

//Métodos con /:id 
router.route('/:id')
 .all(validarId)
 .put(checkSchema(putPedidoValidation),validarCampos,pedidosControllers.actualizar)  //Método  PUT

//Método Get id
 .get(pedidosControllers.consultarDetalle)

//Método PATCH
 .patch(checkSchema(patchPedidoValidation),validarCampos,pedidosControllers.actualizarParcial )

//Método DELETE
 .delete(pedidosControllers.eliminar)

export default router;
