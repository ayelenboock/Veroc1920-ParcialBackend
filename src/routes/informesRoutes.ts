import express from "express";
import { checkSchema } from 'express-validator';
import informesControllers from "../controllers/informesControllers.js";
import { informesValidation } from "../utils/informeValidationSchema.js";
import { validarCampos } from "../utils/validarCampos.js";

const router = express.Router();

router.get('/ventas', checkSchema(informesValidation), validarCampos, informesControllers.ventasPorCategoria);

export default router;
