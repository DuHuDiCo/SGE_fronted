export type Gestion = {
  numeroObligacion: string,
  fechaCompromiso: Date | null,
  clasificacion: string | null,
  gestion: string,
  valorCompromiso: 0,
  contact: boolean,
  detallesAdicionales: string
}

export type GestionArray = {
  idGestion: number,
  numeroObligacion: string,
  numeroDoc: string,
  nombreCliente: string,
  fechaGestion: Date,
  fechaCompromiso: Date,
  gestion: string,
  isContacted: boolean,
  valorCompromiso: number,
  asesorCartera: string,
  banco: {
    idBanco: number,
    banco: string
  },
  clasificacion: {
    idClasificacion: number,
    tipoClasificacion: string
  },
  sede: {
    idSede: number,
    sede: string
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
    gestiones: [
      {
        idGestion: number,
        numeroObligacion: string,
        numeroDoc: string,
        nombreCliente: string,
        fechaGestion: Date,
        fechaCompromiso: Date,
        gestion: string,
        isContacted: boolean,
        valorCompromiso: number,
        datosAdicionales: string,
        gestionLlamada: string,
        asesorCartera: {
          idAsesorCartera: number,
          usuarioId: number
        },
        banco: {
          idBanco: number,
          banco: string
        },
        clasificacion: {
          idClasificacion: number,
          tipoClasificacion: string
        },
        sede: {
          idSede: number,
          sede: string
        }
      }
    ],
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