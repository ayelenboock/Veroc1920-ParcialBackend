import type { Schema } from 'express-validator';
import { PedidoEstado } from '../generated/prisma/enums.js';

//  ESQUEMA BASE uso en POST y PUT
export const pedidoValidation: Schema = {
  id_cliente: {
    isInt: { errorMessage: 'El id_cliente debe ser un número entero' },
    toInt: true
  },
  id_empleado: {
    isInt: { errorMessage: 'El id_empleado debe ser un número entero' },
    toInt: true
  },
  id_compania: {
    isInt: { errorMessage: 'El id_compania debe ser un número entero' },
    toInt: true
  },
  estado: {
    optional: { options: { values: 'falsy' } },
    trim: true,
    isIn: {
      options: [Object.values(PedidoEstado)], 
      errorMessage: 'El estado provisto no es válido'
    }
  },
  // Validaciones del contenedor principal "detalles" (Solo requerida en POST)
  detalles: {
    isArray: { options: { min: 1 }, errorMessage: 'El pedido debe tener al menos un producto en "detalles"' },
    custom: {
      options: (value: any[]) => {
        if (!Array.isArray(value)) return false;
        const ids = value.map(item => Number(item?.id_producto));
        if (new Set(ids).size !== ids.length) {
          throw new Error('Hay productos repetidos: suma las cantidades en un solo detalle');
        }
        return true;
      }
    }
  },
  // Validaciones de cada ítem interno dentro del array detalles
  'detalles.*.id_producto': {
    isInt: { errorMessage: 'Cada detalle necesita un id_producto entero' },
    toInt: true
  },
 
  'detalles.*.cantidad': {
    isInt: { options: { min: 1 }, errorMessage: 'Cada detalle necesita una cantidad entera mayor a 0' },
    toInt: true
  }
};

//ESQUEMA PARA PUT: igual al base pero sin los detalles, ya que no se pueden modificar desde el PUT de la cabecera
export const putPedidoValidation: Schema = Object.fromEntries(
  Object.entries(pedidoValidation).filter(([key]) => !key.startsWith('detalles'))
);

//  ESQUEMA DINÁMICO PARA uso de PATCH
export const patchPedidoValidation: Schema = Object.fromEntries(
  Object.entries(pedidoValidation)
    .filter(([key]) => !key.startsWith('detalles')) // Quitamos los campos de detalles en el PATCH de la cabecera
    .map(([key, value]) => [
      key,
      { ...value, optional: true } // en el PATCH todos los campos son opcionales
    ])
);


//  ESQUEMA PARA AGREGAR UN DETALLE SUELTO (POST /:id/detalles)
export const agregarDetalleValidation: Schema = {
  id_producto: {
    isInt: { errorMessage: 'Se requiere un id_producto entero' },
    toInt: true
  },
  cantidad: {
    isInt: { options: { min: 1 }, errorMessage: 'Se requiere una cantidad entera mayor a 0' },
    toInt: true
  }
};
