import { RolesUser } from "./Roles"

export type users = {
    idUsuario: Number,
    username: string,
    email: string,
    password: string,
    nombres: string,
    apellidos: string,
    tipo_documento: string,
    numero_documento: string,
    celular: string,
    fecha_nacimiento: Date,
    roles : RolesUser[]
  }