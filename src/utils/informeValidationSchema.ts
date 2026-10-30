import type { Schema } from 'express-validator';

export const informesValidation: Schema = {
  desde: {
    in: ['query'],
    optional: true,
    isISO8601: { errorMessage: 'La fecha "desde" debe tener el formato AAAA-MM-DD' },
    default: { options: '2000-01-01' } // Valor por defecto si no se proporciona
  },
  hasta: {
    in: ['query'],
    optional: true,
    isISO8601: { errorMessage: 'La fecha "hasta" debe tener el formato AAAA-MM-DD' },
    default: { options: '2999-12-31' }, // Valor por defecto si no se proporciona
    custom: {
      options: (value, { req }) => {
        // Obtenemos el valor de 'desde' ya procesado o el de fallback si no vino
        const desdeVal = req.query?.desde || '2000-01-01';
        if (desdeVal > value) {
          throw new Error('La fecha "desde" no puede ser posterior a "hasta"');
        }
        return true;
      }
    }
  }
};
