import type { Schema } from 'express-validator';
import { ProveedorCondicionIva } from '../generated/prisma/enums.js';

//  ESQUEMA BASE (POST y PUT) - Todos los campos requeridos
export const proveedorValidation: Schema = {
  razon_social: {
    trim: true,
    notEmpty: { errorMessage: 'La razón social es obligatoria' }
  },
  nombre_contacto: {
    trim: true,
    notEmpty: { errorMessage: 'El nombre de contacto es obligatorio' }
  },
  telefono: {
    trim: true,
    notEmpty: { errorMessage: 'El teléfono es obligatorio' }
  },
  email: {
    trim: true,
    isEmail: { errorMessage: 'Debe proporcionar un correo electrónico válido' }
  },
  direccion: {
    trim: true,
    notEmpty: { errorMessage: 'La dirección es obligatoria' }
  },
  id_ciudad: {
    isInt: { errorMessage: 'El id_ciudad debe ser un número entero' },
    toInt: true
  },
  condicion_iva: {
    trim: true,
    notEmpty: { errorMessage: 'La condición de IVA es obligatoria' },
    isIn: {
      options: [Object.values(ProveedorCondicionIva)], 
      errorMessage: 'La condición de IVA provista no es válida o no está permitida'
    }
  }
};

// ESQUEMA DINÁMICO PARA PATCH
export const patchProveedorValidation: Schema = Object.fromEntries(
  Object.entries(proveedorValidation).map(([key, value]) => [
    key,
    { ...value, optional: true }
  ])
);
