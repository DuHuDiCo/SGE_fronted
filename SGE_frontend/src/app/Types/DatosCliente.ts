export type DatosContacto = {
    username:string
    cedulaCliente:string,
    telefonos:Telefono[],
    correos:string[],
    direcciones:Direccion[]
}

export type Direccion = {
    direccion:string,
    ciudad:string,
    departamento:string,
    pais:string
}

export type Telefono = {
    indicativo: string,
    numero: string
}