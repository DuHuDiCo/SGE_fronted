import { Usuario } from "./Usuario"

export type ConsignacionRanking = {
    consignacionesToday: Number,
    consignacionesMonth: Number,
    consignacionesDevueltasCaja: Number,
    consignacionesPendientes: Number,
    consignacionesComprobadas: Number,
    consignacionesComprobadasBySede: Number,
    consignacionesAplicado: Number,
    consignacionesAplicadoBySede: Number,
    consignacionesDevueltasContabilidad: Number,
  }