import { RolesUser } from "./Roles"

export type users = {
    idUsuario: number,
    username: string,
    email: string,
    password: string,
    nombres: string,
    apellidos: string,
    celular: string,
    status: string,
    sede: string,
    roles : RolesUser[]
  }