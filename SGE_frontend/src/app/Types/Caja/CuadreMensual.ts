
export type CuadreMensual = {
    idCuadreMensual: number,
    anio: number,
    valorTotalCartera: number,
    valorTotalContado: number,
    valorTotalIniciales: number,
    valorTotalGastos: number,
    valorTotalMes: number,
    mes: number,
    fechaCuadre: Date,
    usuario: {
        idUsuario: number,
        username: string,
        email: string,
        password: string,
        nombres: string,
        apellidos: string,
        sede: string,
        tipo_documento: string,
        numero_documento: string,
        celular: string,
        fecha_nacimiento: Date,
        fecha_creacion: Date,
        status: boolean,
    }
}