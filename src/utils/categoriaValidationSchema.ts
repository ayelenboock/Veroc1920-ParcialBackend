import type { Schema } from 'express-validator';

//  ESQUEMA BASE (POST y PUT) - Todos los campos requeridos
export const categoriaValidation: Schema = {
  nombre: {
    trim: true,
    notEmpty: { errorMessage: 'El nombre de la categoría es obligatorio' },
    isLength: { options: { min: 2, max: 50 }, errorMessage: 'El nombre debe tener entre 2 y 50 caracteres' }
  },
  descripcion: {
    trim: true,
    notEmpty: { errorMessage: 'La descripción es obligatoria' }
  }
};

// ESQUEMA DINÁMICO PARA PATCH
export const patchCategoriaValidation: Schema = Object.fromEntries(
  Object.entries(categoriaValidation).map(([key, value]) => [
    key,
    { ...value, optional: true }
  ])
);
