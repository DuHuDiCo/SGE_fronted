export type Campaign = {
    nombreCampania: string,
    parametros: Parametros[],
    namesViews: string[],
    asesoresId: number[],
    parametroOrdenamientoDTOs: parametroOrdenamientoDTOs[],
    isAsignacion: boolean
}

type Parametros = {
    parametro: string,
    subParametros: string[]
}

type parametroOrdenamientoDTOs = {
    parametroOrdenamiento: string,
    direccionOrdenamiento: string,
    bloque: string
}

export type newParametros = {
    bancos: any[],
    clasiJuridica: any[]
    dias: any[]
    edad: any[]
    moraObligatoria: any[]
    sede: any[]
    tipoCredito: any[]
    tipoObligacion: any[]
}