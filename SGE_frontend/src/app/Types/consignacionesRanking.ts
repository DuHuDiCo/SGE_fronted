import { Usuario } from "./Usuario"

export type ConsignacionRanking = {
    consignacionesToday: Number,
    consignacionesMonth: Number,
    consignacionesDevueltasCaja: Number,
    consignacionesPendientes: Number,
    consignacionesComprobadas: Number,
    consignacionesComprobadasSede: Number,
    consignacionesAplicada: Number,
    consignacionesAplicadasSede: Number,
    consignacionesDevueltasContabilidad: Number,
  }