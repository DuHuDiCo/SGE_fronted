export type Cliente = {
  idCliente: Number,
  nombres: string,
  apellidos: string,
  tipoDocumento: string,
  numeroDocumento: string,
  fechaNacimiento: Date,
  lugarNacimiento: string,
  fechaExpedicionDocumento: Date,
  lugarExpedicionDocumento: string,
  fechaCreacion: Date,
  usuarioId: Number,
  telefonos: [{
    idTelefono: Number,
    indicativo: string,
    numero: string,
    isCurrent: boolean,
    fechaCreacion: Date
  }],
  direcciones: [{
    idDireccion: Number,
    direccion: string,
    ciudad: string,
    departamento: string,
    pais: string,
    isCurrent: boolean,
    fechaCreacion: Date
  }],

  correosElectronicos: [{
    idCorreoElectronico: Number,
    email: string,
    fechaCreacion: Date,
    isCurrent: boolean 
  }],
  tipoClientes: [{
    idTipoCliente: Number,
    tipoClienteId: Number
  }],
  referenciasComerciales: [{
    idReferenciaComercial: Number,
    nombreCompleto: string,
    telefono: string,
    cliente: {
    }
  }],
  referenciasPersonales: [{
    idReferenciaPersonal: Number,
    nombreCompleto: string,
    telefono: string,
    cliente: {

    }
  }],
  referenciasFamiliares: [{
    idReferenciaFamiliar: Number,
    nombreCompleto: string,
    telefono: string,
    cliente: {

    }
  }]
  
}
