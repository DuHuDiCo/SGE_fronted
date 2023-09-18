export type Consignacion = {
  idConsignacion: number,
  numeroRecibo: string,
  valor: number,
  fechaPago: Date,
  idPlataforma: number,
  observaciones: string,
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

export type Obligacion = {
    idCuentasPorCobrar: number,
    numeroObligacion: string,
    cliente: string,
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
    tipoCuentaPorCobrar: {
      tipoCuentaPorCobrar: number,
      tipoCuenta: string
    },
    estado: {
      idEstado: number,
      estado: string
    },
    asesores:Asesores [],
    coutas:Cuotas []
  }