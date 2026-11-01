import type { Schema } from 'express-validator';
import { ClienteCondicionIva } from '../generated/prisma/enums.js';

// 1. ESQUEMA BASE (Para POST y PUT -> Todos los campos son requeridos obligatoriamente)
export const clienteValidation: Schema = {
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
  cuit: {
    trim: true,
    notEmpty: { errorMessage: 'El CUIT es obligatorio' },
    isNumeric: { errorMessage: 'El CUIT debe contener solo números' },
    isLength: { options: { min: 11, max: 11 }, errorMessage: 'El CUIT debe tener exactamente 11 dígitos' }
  },
  razon_social: {
    trim: true,
    notEmpty: { errorMessage: 'La razón social es obligatoria' }
  },
  direccion: {
    trim: true,
    notEmpty: { errorMessage: 'La dirección es obligatoria' }
  },
  id_ciudad: {
    isInt: { errorMessage: 'El id_ciudad debe ser un número entero' },
    toInt: true 
  },
  telefono: {
    trim: true,
    notEmpty: { errorMessage: 'El teléfono es obligatorio' }
  },
  email: {
    trim: true,
    isEmail: { errorMessage: 'Debe proporcionar un correo electrónico válido' }
  },
  dni: {
    trim: true,
    notEmpty: { errorMessage: 'El DNI es obligatorio' },
    isNumeric: { errorMessage: 'El DNI debe contener solo números' }
  },
  condicion_iva: {
    trim: true,
    notEmpty: { errorMessage: 'La condición de IVA es obligatoria' },
    isIn: {
      options: [Object.values(ClienteCondicionIva)], 
      errorMessage: 'La condición de IVA provista no es válida o no está permitida'
    }
  }
};

// 2. ESQUEMA DINÁMICO PARA PATCH 
// Mapea el objeto de arriba y le añade automáticamente "optional: true" a cada propiedad.
// De esta manera, si en un PATCH solo envían el 'email', no va a fallar por no pasar otros campos.
export const patchClienteValidation: Schema = Object.fromEntries(
  Object.entries(clienteValidation).map(([key, value]) => [
    key,
    { ...value, optional: true }
  ])
);
