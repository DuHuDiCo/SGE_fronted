import { RolesUser } from "./Roles"

export type Cliente = {
  nombres: string,
  apellidos : string,
  tipoDocumento: string,
  numeroDocumento: string,
  fechaNacimiento: Date,
  lugarNacimiento: string,
  fechaExpedicionDocumento: Date,
  lugarExpedicionDocumento: string,
  telefono: {
    
    indicativo: string,
    numero: string,
    
  },
  direccion: {
    
    direccion: string,
    ciudad: string,
    departamento: string,
    pais: string,
  },
  correoElectronico: {
    
    email: string,
    
  },
  tipoCliente: number,
  username: string,
}
