export type Archivo = {
  numeroObligacion: string,
  base64: Base64[],
  username: string
}

export type Base64 = {
  base46: string,
  nombreArchivo: string,
  tipoArchivo: string
}