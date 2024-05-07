export type Campaign = {
    nombreCampaña: string,
    parametros: Parametros[],
    namesViews: string[],
    asesoresId: number[],
    parametroOrdenamientoDTOs: parametroOrdenamientoDTOs[]
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