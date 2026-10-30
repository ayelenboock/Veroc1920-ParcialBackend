import type { Schema } from 'express-validator';

//  ESQUEMA BASE (POST y PUT) - Todos los campos requeridos
export const companiaEnvioValidation: Schema = {
  nombre: {
    trim: true,
    notEmpty: { errorMessage: 'El nombre de la compañía es obligatorio' },
    isLength: { options: { min: 2, max: 100 }, errorMessage: 'El nombre debe tener entre 2 y 100 caracteres' }
  },
  telefono: {
    trim: true,
    notEmpty: { errorMessage: 'El teléfono es obligatorio' }
  },
  direccion: {
    trim: true,
    notEmpty: { errorMessage: 'La dirección es obligatoria' }
  },
  id_ciudad: {
    isInt: { errorMessage: 'El id_ciudad debe ser un número entero' },
    toInt: true
  }
};

// ESQUEMA DINÁMICO PARA PATCH
export const patchCompaniaEnvioValidation: Schema = Object.fromEntries(
  Object.entries(companiaEnvioValidation).map(([key, value]) => [
    key,
    { ...value, optional: true }
  ])
);
