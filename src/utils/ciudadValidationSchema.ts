import type { Schema } from 'express-validator';

//  ESQUEMA BASE (POST y PUT) - Todos los campos requeridos
export const ciudadValidation: Schema = {
  nombre: {
    trim: true,
    notEmpty: { errorMessage: 'El nombre de la ciudad es obligatorio' },
    isLength: { options: { min: 2, max: 100 }, errorMessage: 'El nombre debe tener entre 2 y 100 caracteres' }
  },
  codigo_postal: {
    trim: true,
    notEmpty: { errorMessage: 'El código postal es obligatorio' }
  },
  provincia: {
    trim: true,
    notEmpty: { errorMessage: 'La provincia es obligatoria' }
  }
};

//  ESQUEMA DINÁMICO PARA PATCH
export const patchCiudadValidation: Schema = Object.fromEntries(
  Object.entries(ciudadValidation).map(([key, value]) => [
    key,
    { ...value, optional: true }
  ])
);
