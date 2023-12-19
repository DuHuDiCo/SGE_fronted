export type CuentasCobrarResponse = {
  idCuentasPorCobrar: number,
  numeroObligacion: string,
  cliente: string,
  documentoCliente: string,
  fechaCuentaCobrar: Date,
  fechaVencimiento: Date,
  tipo: string,
  valorNotaDebito: number,
  valorCuota: number,
  valorPagos: number,
  nombre_usuario: string,
  clasificacion: string,
  vendedor: string,
  clasificacionJuridica: string,
  detalle: string,
  sede: {
    idSede: number,
    sede: string
  },
  banco: {
    idBanco: number,
    banco: string
  },
  diasVencidos: number,
  gestion: Gestion[],
  edadVencimiento: string,
  condicionEspecial: string,
  numeroCreditos: number,
  pagare: string,
  moraObligatoria: number,
  totalObligatoria: number,
  cuotasMora: number,
  cuotas: number,
  asesorCarteraResponse: {
    idAsesorCartera: number,
    usuario: {
      idUsuario: number,
      username: string,
      email: string,
      nombres: string,
      apellidos: string,
      sede: string,
      tipo_documento: string,
      numero_documento: string,
      celular: string,
      fecha_nacimiento: Date,
      fecha_creacion: Date,
      status: boolean,
      roles: Roles[],
      enabled: boolean,
      password: string,
      accountNonExpired: boolean,
      authorities: Autorities[],
      credentialsNonExpired: boolean,
      accountNonLocked: boolean
    }
  },
  clientes: Clientes []
}

export type CuentaCobrarCalculate = {
  numeroObligacion: string,
  valorTotal: number,
  moraObligatoria: number,
  fechaVencimiento: Date,
  username: string
}

export type Gestion = {
  idGestion: number,
  numeroObligacion: string,
  numeroDoc: string,
  nombreCliente: string,
  fechaGestion: Date,
  fechaCompromiso: Date,
  clasificacionGestion: ClasificacionGestion,
  gestion: string,
  valorCompromiso: string,
  gestionLlamada: string,
  asesorCartera: {
    idAsesorCartera: number,
    usuarioId: number
  },
  banco: {
    idBanco: number,
    banco: string
  },
  sede: {
    idSede: number,
    sede: string
  }
}

export type ClasificacionGestion={
  clasificacion: string
  cuotasList: CoutasList[],
  detalle: string,
  fechaAcuerdo: Date,
  fechaCompromiso: Date,
  honorarioAcuerdo: number,
  idClasifiacionGestion: number,
  isActive: boolean,
  nombresClasificacion : {
    idNombreClasificacion :number,
    nombre:string,
    tipo:string
  },
  tipoAcuerdo: string,
  valorCuotaMensual:number,
  valorInteresMora:number,
  valorTotalAcuerdo:number
}

export type CoutasList={
  capitalCuota: number,
  cumplio:boolean,
  fechaVencimiento:string,
  idCuota: number,
  interesCuota:number,
  numeroCuota:number,
  valorCuota:number,
  honorarios:number
}

export type Roles = {
  idRol: number,
  rol: string,
  permisos: [
    {
      idPermiso: number,
      permiso: string
    }
  ]
}

export type Autorities = {
  authority: string
}

export type Clientes = {
  idCliente: number,
  nit: string,
  tipoDoc: string,
  numeroDocumento: string,
  nombreTitular: string,
  numeroObligacion: string,
  direcciones: [
    {
      idDireccion: number,
      direccion: string,
      tipoDireccion: string,
      isCurrent: boolean,
      fechaCreacion: Date,
      cliente: string
    }
  ],
  telefonos: [
    {
      idTelefono: number,
      indicativo: string,
      numero: string,
      cliente: string,
      isCurrent: boolean,
      fechaCreacion: Date
    }
  ],
  correos: [
    {
      idCorreoElectronico: number,
      email: string,
      fechaCreacion: Date,
      isCurrent: boolean,
      cliente: string
    }
  ],
  descripcionDetallada: string,
  status: boolean,
  fechaNacimiento: Date,
  fechaEmision: Date,
  vendedor: string,
  departamento: string,
  municipio: string,
  clasificacionJur: string,
  saldoActual: number,
  saldoVencido: number,
  montoUltimoPago: number,
  fechaUltimoPago: Date,
  pagosEfectuados: number,
  montoUltimaVenta: number,
  sede: string,
  banco: string,
  tipoGarante: {
    idTipoGarante: number,
    tipoGarante: string
  }
}