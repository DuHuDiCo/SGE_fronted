export type ClienteObj = {
    celulares: Telefono[],
    direcciones: Direccion[],
    correos: Correo[],
    referencias: Referencia[],
    infoLaboral: InfoLaboral[]
}

export type Responsables = {
    tipoGarante: string,
    nombre: string
}

export type Telefono = {
    numero: string
    isConfirm: boolean
}

export type Direccion = {
    direccion: string,
    isConfirm: boolean
}

export type Correo = {
    correo: string,
    isConfirm: boolean
}

export type Referencia = {
    referencia: string,
    isConfirm: boolean
}

export type InfoLaboral = {
    info: string,
    isConfirm: boolean
}