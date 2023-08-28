import { RolesUser } from "./Roles"

export type users = {
    idUsuario: Number,
    username: string,
    email: string,
    password: string,
    nombres: string,
    apellidos: string,
    celular: string,
    status: string,
    roles : RolesUser[]
  }