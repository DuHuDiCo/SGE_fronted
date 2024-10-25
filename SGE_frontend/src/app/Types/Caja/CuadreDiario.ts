import { TiposReportes } from "./TipoReportes"

export type IngresosDiariosArray = {
    idIngresosDiarios: number,
    valorIngreso: number,
    fechaIngreso: Date,
    descripcion: string,
    tipoIngreso: {
        idTipoIngreso: number,
        nombre: string
    },
}

export type CuadreDiario = {
    some(arg0: (cuadre: any) => boolean): unknown
    length: number
    idCuadreDiario: number,
    valorCartera: number,
    valorIniciales: number,
    valorContado: number,
    valorGastos: number,
    valorBancolombia: number,
    fechaCreacion: Date,
    fechaCuadre: Date,
    valorTotalCuadre: number,
    usuario: {
        idUsuario: number,
        username: string,
        email: string,
        password: string,
        nombres: string,
        apellidos: string,
        sede: string,
        tipo_documento: string,
        numero_documento: string,
        celular: string,
        fecha_nacimiento: Date,
        fecha_creacion: Date,
        status: boolean,
    }

    reporte : {
        idReporte: number;
        fechaReporte: string;
        dataUir: string;
        ruta: string;
        idUsuario: number;
        tipoReporte: TiposReportes;
      }
}




