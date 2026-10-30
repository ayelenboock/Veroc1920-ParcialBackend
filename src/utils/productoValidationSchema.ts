import type { Schema } from 'express-validator';

// 1. ESQUEMA BASE (POST y PUT) - Todos los campos requeridos
export const productoValidation: Schema = {
  id_categoria: {
    isInt: { errorMessage: 'El id_categoria debe ser un número entero' },
    toInt: true
  },
  id_proveedor: {
    isInt: { errorMessage: 'El id_proveedor debe ser un número entero' },
    toInt: true
  },
  nombre_producto: {
    trim: true,
    notEmpty: { errorMessage: 'El nombre del producto es obligatorio' },
    isLength: { options: { min: 2, max: 100 }, errorMessage: 'El nombre debe tener entre 2 y 100 caracteres' }
  },
  descripcion: {
    trim: true,
    notEmpty: { errorMessage: 'La descripción es obligatoria' }
  },
  precio: {
    isFloat: { options: { min: 0 }, errorMessage: 'El precio debe ser un número positivo' },
    toFloat: true
  },
  stock: {
    optional: { options: { values: 'falsy' } }, // Permite que en POST sea opcional (asume 0 si está vacío)
    isInt: { options: { min: 0 }, errorMessage: 'El stock debe ser un entero mayor o igual a 0' },
    toInt: true
  }
};

// 2. ESQUEMA DINÁMICO PARA USAR CON PATCH
export const patchProductoValidation: Schema = Object.fromEntries(
  Object.entries(productoValidation).map(([key, value]) => [
    key,
    { ...value, optional: true }
  ])
);
