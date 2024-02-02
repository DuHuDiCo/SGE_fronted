export type Gestion = {
  numeroObligacion: string,
  clasificacion: {
    nombreClasificacion: string | null,
    tipoClasificacion: string | null,
    tarea: {
      detalleTarea: string,
      fechaFinTarea: Date,
      isPartOfRecaudo: boolean
    } | null,
    nota: {
      detalle: string
    } | null,
    acuerdoPago: {
      detalle: string,
      valorCuotaMensual: number,
      tipoAcuerdo: string,
      valorTotalAcuerdo: number,
      valorInteresesMora: number,
      honoriarioAcuerdo: number,
      fechaCompromiso: Date,
      cuotasList: CuotaList[],
      username: string
    } | null
  },
  contact: boolean,
  detallesAdicionales: string,
  usernameToSetNotificacion: string,
  userNotifying: string
}

export type GestionArray = {
  idGestion: number,
  numeroObligacion: string,
  fechaGestion: Date,
  detallesGestion: string,
  detallesAdicionales: string,
  asesorCartera: string,
  clasificacion: {
    idClasificacionGestion: number,
    clasificacion: string
  },
  cpc: {
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
    gestiones: Gestiones[],
    asesor: {
      idAsesorCartera: number,
      usuarioId: number
    },
    diasVencidos: number,
    edadVencimiento: string,
    condicionEspecial: string,
    numeroCreditos: number,
    pagare: string,
    moraObligatoria: number,
    cuotasMora: number,
    cuotas: number
  }
}

export type CuotaList = {
  idCuota: number,
  numeroCuota: number,
  fechaVencimiento: Date,
  valorCuota: number,
  capitalCuota: number,
  honorarios: number,
  pagos: Pagos,
  interesCuota: number,
  cumplio: boolean,
  pago:boolean
  
}

export type Gestiones = {
  idGestion: number,
  numeroObligacion: string,
  fechaGestion: Date,
  detallesGestion: string,
  detallesAdicionales: string,
  asesorCartera: {
    idAsesorCartera: number,
    usuarioId: number
  },
  clasificacionGestion: {
    idClasificacionGestion: number,
    clasificacion: string
  },
  clasificacion: {
    idClasificacionGestion: number,
    clasificacion: string
  }
}

export type TipoVencimiento = {
  idTipoVencimiento: number,
  tipoVencimiento: string

}

export type Pagos = {
  idPago: number,
  valorPago: number;
  fechaPago: Date;
  usuarioId: number;
  saldoCuota: number;
  reciboPago:ReciboPago | null
}

export type CuotasRequest = {
  idCuota:number,
  numeroCuota: number,
  fechaVencimiento: Date,
  valorCuota: number,
  capitalCuota: number,
  honorarios: number,
  cumplio: boolean,
  pago:boolean
  interesCuota: number
  pagosDto: PagosRequest | null
}

export type PagosRequest = {

  valorPago: number;
  fechaPago: Date;
  saldoCuota: number;

}


export type ReciboPago = {
  idRecibo: number,
  numeroRecibo: string,
  valorRecibo: number,
  fechaRecibo: Date,
  ruta: string
  nombreArchivo: string

}

export type Filtros = {
  banco: string[],
  diasVencidosInicio: number | null,
  diasVencidosFin: number | null,
  edadVencimiento: string[],
  sede: string[],
  username: string,
  clasiJuridica: string[],
  saldoCapitalInicio: number | null,
  saldoCapitalFin: number | null,
  fechaCpcInicio: Date | null,
  fechaCpcFin: Date | null,
  fechaGestionInicio: Date | null,
  fechaGestionFin: Date | null,
  fechaCompromisoInicio: string | null,
  fechaCompromisoFin: string | null,
  isActive: boolean

}

export type Notificacion = {
  idNotificaciones: number,
    tipoGestion: string,
    fechaCreacion: Date,
    fechaFinalizacion: Date,
    numeroObligacion: string,
    cliente: string,
    isActive: boolean,
    designatedBy: string,
    designatedTo: number,
    verRealizadas: string
}

export enum ClasificacionGestion{
  AcuerdoPago = "ACUERDO DE PAGO",
  Nota = "NOTA",
  Tarea = "TAREA"
}
