export type IngresosDiariosArray = {
    idIngresosDiarios: number,
    valorIngreso: number,
    fechaIngreso: Date
    tipoIngreso: {
        idTipoIngreso: number,
        nombre: string
    }
}

export type CuadreDiario = {
    idCuadreDiario: number,
    valorCartera: number,
    valorIniciales: number,
    valorContado: number,
    valorGastos: number,
    valorBancolombia: number,
    fechaCreacion: Date,
    fechaCuadre: Date,
    valorTotalCuadre: number
}