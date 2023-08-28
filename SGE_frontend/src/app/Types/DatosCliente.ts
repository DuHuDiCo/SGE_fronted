export type DatosContacto = {
    cedulaCliente:string,
    telefonos:string[],
    correos:string[],
    direcciones:Direccion[]
}

export type Direccion = {
    direccion:string,
    ciudad:string,
    departamento:string,
    pais:string
}