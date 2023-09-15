export type Banco = {
    idBanco: number,
    nombreBanco: string,
    idTipoPago: number
}

export type Plataforma = {
    idPlataforma: number,
    bancoDto:Banco
  }