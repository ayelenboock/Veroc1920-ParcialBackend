//Convierte un valor de enum al formato que usa Prisma--->Responsable Inscripto o Responsable-Inscripto--->Responsable_Inscripto
export const normalizarEnum = (valor: unknown) => {
    if (typeof valor !== 'string') return valor; //si no es texto, lo deja igual
    return valor.trim().replace(/[\s-]+/g, '_');
}