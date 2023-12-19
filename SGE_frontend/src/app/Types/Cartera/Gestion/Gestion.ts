export type Gestion = {
  numeroObligacion: string,
  clasificacion: {
    nombreClasificacion: string,
    tipoClasificacion: string | null,
    tarea: {
      detalleTarea: string,
      fechaFinTarea: Date,
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
      cuotasList: any[],
      username: string
    } | null
  },
  gestion: string,
  contact: boolean,
  detallesAdicionales: string
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
  fechaVencimiento: string,
  valorCuota: number,
  capitalCuota: number,
  honorarios: number,
  cumplio: boolean
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