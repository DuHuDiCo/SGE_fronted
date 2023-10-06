import { Usuario } from "./Usuario"

export type Consignacion = {
  idConsignacion: number,
  numeroRecibo: string,
  valor: number,
  fechaPago: Date,
  idPlataforma: number,
  observaciones: string | null,
  obligaciones: string[],
  base64: string,
  username: string
}

export type Asesores = {
  idAsesorCartera: number,
  usuarioId: number
}

export type Cuotas = {
  idPlanPagos: number,
  numeroCuota: number,
  fechaVencimiento: Date,
  valorCuota: number,
  descripcion: string,
  capital: number,
  intereses: number,
  saldoCapital: number,
  saldoIntereses: number,
  saldoCuota: number,
  otrosCobros: number,
  pagos: [
    {
      idDiscriminacionPagos: number,
      cuotas: string,
      pago: {
        idPagos: number,
        fechaPago: Date,
        fechaEmision: Date,
        valor: number,
        interesCorriente: number,
        capital: number,
        interesMora: number,
        diasVencidos: number,
        discriminacion: [
          string
        ]
      },
      valorCuota: number,
      valorCapital: number,
      valorInteresCorriente: number,
      valorInteresMora: number,
      valorOtrosCobros: number,
      saldoCapital: number,
      saldoInteresesCorrientes: number,
      saldoInteresesMora: number
    }
  ]
}

export type Obligacion =  {
  idCuentasPorCobrar: number,
  numeroObligacion: string,
  cliente: {
    idCliente: number,
    nombres: string,
    apellidos: string,
    tipoDocumento: string,
    numeroDocumento: string,
    fechaNacimiento: Date,
    lugarNacimiento: string,
    fechaExpedicionDocumento: Date,
    lugarExpedicionDocumento: string,
    fechaCreacion: Date,
    usuarioId: number,
    telefonos: [
      {
        idTelefono: number,
        indicativo: string,
        numero: string,
        isCurrent: true,
        fechaCreacion: Date,
        createBy: string
      }
    ],
    direcciones: [
      {
        idDireccion: number,
        direccion: string,
        ciudad: string,
        departamento: string,
        pais: string,
        isCurrent: true,
        fechaCreacion: Date,
        createBy: string
      }
    ],
    correosElectronicos: [
      {
        idCorreoElectronico: number,
        email: string,
        fechaCreacion: Date,
        isCurrent: true,
        createBy: string
      }
    ]
  },
  totalCuotas: number,
  periodicidad: number,
  valorCuota: number,
  saldoInicial: number,
  diasVencidos: number,
  capital: number,
  saldoVencido: number,
  interesesTotales: number,
  interesesVencidos: number,
  otrosCobros: number,
  saldoMora: number,
  saldoTotal: number,
  observacion: string,
  id_venta: number,
  fechaObligacion: Date,
  tipoCuentaPorCobrar: {
    tipoCuentaPorCobrar: number,
    tipoCuenta: string
  },
  estado: {
    idEstado: number,
    estado: string
  },
  sede: {
    idSede: number,
    nombreSede: string
  }
  asesores: [
    {
      idAsesorCartera: number,
      usuarioId: number
    }
  ],
  coutas: [
    {
      idPlanPagos: number,
      numeroCuota: number,
      fechaVencimiento: Date,
      valorCuota: number,
      descripcion: string,
      capital: number,
      intereses: number,
      saldoCapital: number,
      saldoIntereses: number,
      saldoCuota: number,
      otrosCobros: number,
      pagos: [
        {
          idDiscriminacionPagos: number,
          cuotas: string,
          pago: {
            idPagos: number,
            fechaPago: Date,
            fechaEmision: Date,
            valor: number,
            interesCorriente: number,
            capital: number,
            interesMora: number,
            diasVencidos: number,
            discriminacion: [
              string
            ]
          },
          valorCuota: number,
          valorCapital: number,
          valorInteresCorriente: number,
          valorInteresMora: number,
          valorOtrosCobros: number,
          saldoCapital: number,
          saldoInteresesCorrientes: number,
          saldoInteresesMora: number
        }
      ]
    }
  ]
}

export type Con = {
  idConsignacion: number,
  numeroRecibo: string,
  sede:string,
  valor: number,
  fechaPago: Date,
  fechaCreacion: Date,
  isSelected: true,
  usuarioId: number,
  comprobantes: {
    idComprobante: number,
    nombreArchivo: string,
    rutaArchivo: string,
    fechaCreacion: Date,
    usuarioId: number,
    dataURI: string
  },
  plataforma: {
    idPlataforma: number,
    bancos: {
      idBancos: number,
      nombreBanco: string,
      tipoPago: tipoPago[]
    }
  },
  observaciones: Observacion[],
  cuentasCobrar: CuentasPorCobrar[],
  actualizaciones:Actualizaciones [],
  fileReportes:Reportes []
}

export type tipoPago = {
  idTipoPago: number,
  tipoPago: string
}

export type Observacion = {
  idObservacion: number,
  detalle: string,
  fechaCreacion: Date,
  usuario:any
}

export type ObservacionDto = {
  detalle: string,
  username: string,
  idConsignacion: number
}

export type Obg = {
  idCuentaCobrar: number,
  idObligacion: number
}

export type Actualizaciones =  {
  idActualizacion: number,
  fechaActualizacion: Date,
  isCurrent:boolean,
  usuario: Usuario,
  estado: {
    idEstado: number,
    estado: string
  }
}

export type Reportes = {
  idReporte: number,
  nombreReporte: string,
  ruta: string,
  fechaReporte: Date,
  usuarioId: number,
  tipoReporte: string
}

export type Correos = {
  idCorreoElectronico: number,
  email: string,
  fechaCreacion: Date,
  isCurrent: true,
  createBy: string
}

export type Direcciones = {
  idDireccion: number,
  direccion: string,
  ciudad: string,
  departamento: string,
  pais: string,
  isCurrent: true,
  fechaCreacion: Date,
  createBy: string
}

export type Telefonos = {
  idTelefono: number,
  indicativo: string,
  numero: string,
  isCurrent: true,
  fechaCreacion: Date,
  createBy: string
}

export type CuentasPorCobrar = {
  idCuentasPorCobrar: number,
  numeroObligacion: string,
  cliente: {
    idCliente: number,
    nombres: string,
    apellidos: string,
    tipoDocumento: string,
    numeroDocumento: string,
    fechaNacimiento: Date,
    lugarNacimiento: string,
    fechaExpedicionDocumento: Date,
    lugarExpedicionDocumento: string,
    fechaCreacion: Date,
    usuarioId: number,
    telefonos: Telefonos[],
    direcciones:Direcciones [],
    correosElectronicos:Correos []
  },
  totalCuotas: number,
  periodicidad: number,
  valorCuota: number,
  saldoInicial: number,
  diasVencidos: number,
  capital: number,
  saldoVencido: number,
  interesesTotales: number,
  interesesVencidos: number,
  otrosCobros: number,
  saldoMora: number,
  saldoTotal: number,
  fechaObligacion: Date,
  observacion: string,
  id_venta: number,
  tipoCuentaPorCobrar: {
    tipoCuentaPorCobrar: number,
    tipoCuenta: string,
    cuentasPorCobrar: string
  },
  estado: {
    idEstado: number,
    estado: string
  },
  sede: {
    idSede: number,
    nombreSede: string
  },
  asesores:Asesores [],
  coutas:Cuotas []
}

export type CambioEstado = {
  estado: string,
  idConsignacion: number,
  username: string,
  observacion: string
}

export type IsSelected = {
  idConsignacion: number,
  username: string,
  opcion: string,
  estado: string
}

export type ConRes = {
  mensaje:string,
  consigRes: Con[]
}