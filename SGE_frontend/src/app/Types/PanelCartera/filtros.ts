export type FiltrosGenerales = {
    filtradoByTextPlain: FiltrosFile | null,
    parametrosFiltradoDTO: FiltroParametro | null
}

type FiltrosFile = {
    cuentas: string[],
    ordenamientoDTO: Orden[]
}

export type FiltroParametro = {
    bancos: string | null,
    edadVencimientos: string | null,
    sede: string | null,
    juridica: string | null,
    tipoCredito: string | null,
    fechaStart: Date | string | null,
    fechaEnd: Date | string | null,
    moraStart: number | null,
    moraEnd: number | null,
    diasStart: number | null,
    diasEnd: number | null,
    totalStart: number | null,
    totalEnd: number | null,
    orden: Orden[]
}

type Orden = {
    parametroOrdenamiento: string,
    direccionOrdenamiento: string,
    bloque: string
}