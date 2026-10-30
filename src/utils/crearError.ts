//Crea un error con código HTTP para que lo responda el Middleware manejoErrores.ts

export const crearError = (status: number, message: string) => {
    const error: any = new Error(message);
    error.status = status;
    return error;
}