export type Archivo = {
  numeroObligacion: string,
  base64: Base64[],
  username: string
}

export type Base64 = {
  base46: string[],
  nombreArchivo: string,
  tipoArchivo: string
}

export type EditarArchivo = {
  idArchivo: number,
  base64: string,
  username: string,
  tipoArchivo: string,
  nombreOriginal: string
}