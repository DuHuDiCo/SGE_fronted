export type RolesUsuario = {
    cartera: boolean,
    caja: boolean,
    archivos: boolean,
    ventas: boolean,
    servicios: boolean,
    consignaciones: boolean,
    administracion: boolean,
    sst: boolean,
}

export type RolSystem ={
    rol:string
}


export enum ROLES{
    SuperAdministration = "SuperAdministration",
    Administration = "Administration",
    Cartera = "Cartera",
    Caja = "Caja",
    Creditos = "Creditos",
    Ventas = "Ventas"
}