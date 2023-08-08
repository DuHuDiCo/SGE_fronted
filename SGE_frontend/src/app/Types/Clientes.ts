import { RolesUser } from "./Roles"

export type Usuario = {
    username: string,
    email: string,
    password: string,
    nombres: string,
    apellidos: string,
    tipo_documento: string,
    numero_documento: string,
    lugar_nacimiento: string,
    fecha_expedicion_documento: string,
    lugar_expedicion_documento: string,
    cuidad: string,
    departamento: string,
    pais: string,
    celular: string,
    fecha_nacimiento: string,
    roles : RolesUser[]
  }