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
    idRole:number
    rol:string
}

export type Roles = {
    idRole:number,
    rol:string,
    permissions: [
        {
            idPermission: number,
            permission: string
        }
    ]
}

export type RolesUser = {
    rol: string,
    permisos : string[]
}


export type RolDto = {
    id:number,
    permisos:number[]
}

export enum ROLES{
    SuperAdministration = "SUPERADMINISTRADOR",
    Administration = "ADMINISTRATION",
    Cartera = "CARTERA",
    Consignaciones = "CONSIGNACIONES",
    Caja = "Caja",
    Creditos = "Creditos",
    Ventas = "Ventas",
    Archivos = "Archivos"
}