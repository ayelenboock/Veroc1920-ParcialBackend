import type { Schema } from 'express-validator';

//  ESQUEMA BASe que se usa (POST y PUT)  Todos los campos requeridos
export const empleadoValidation: Schema = {
  nombre: {
    trim: true,
    notEmpty: { errorMessage: 'El nombre es obligatorio' },
    isLength: { options: { min: 2, max: 50 }, errorMessage: 'El nombre debe tener entre 2 y 50 caracteres' }
  },
  apellido: {
    trim: true,
    notEmpty: { errorMessage: 'El apellido es obligatorio' },
    isLength: { options: { min: 2, max: 50 }, errorMessage: 'El apellido debe tener entre 2 y 50 caracteres' }
  },
  fecha_de_nac: {
    isISO8601: { errorMessage: 'La fecha de nacimiento debe tener un formato de fecha válido (AAAA-MM-DD)' },
    toDate: true // Lo convierte automáticamente a objeto Date de JS
  },
  fecha_de_ingreso: {
    isISO8601: { errorMessage: 'La fecha de ingreso debe tener un formato de fecha válido (AAAA-MM-DD)' },
    toDate: true // Lo convierte automáticamente a objeto Date de JS
  },
  dni: {
    trim: true,
    notEmpty: { errorMessage: 'El DNI es obligatorio' },
    isNumeric: { errorMessage: 'El DNI debe contener solo números' }
  },
  cuil: {
    trim: true,
    notEmpty: { errorMessage: 'El CUIL es obligatorio' },
    isNumeric: { errorMessage: 'El CUIL debe contener solo números' },
    isLength: { options: { min: 11, max: 11 }, errorMessage: 'El CUIL debe tener exactamente 11 dígitos' }
  },
  email: {
    trim: true,
    isEmail: { errorMessage: 'Debe proporcionar un correo electrónico válido' },
    normalizeEmail: true
  },
  puesto: {
    trim: true,
    notEmpty: { errorMessage: 'El puesto es obligatorio' }
  }
};

// 2. ESQUEMA DINÁMICO PARA PATCH
export const patchEmpleadoValidation: Schema = Object.fromEntries(
  Object.entries(empleadoValidation).map(([key, value]) => [
    key,
    { ...value, optional: true }
  ])
);
