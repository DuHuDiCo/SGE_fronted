
export type CuadreMensual = {
    idCuadreMensual: number,
    anio: number,
    valorTotalCartera: number,
    valorTotalContado: number,
    valorTotalIniciales: number,
    valorTotalGastos: number,
    fechaCreacion: Date,
    fechaCuadre: Date,
    valorTotalMes: number,
    usuario: {
        idUsuario: number,
        username: string,
        email: string,
        password: string,
        nombres: string,
        apellidos: string,
        tipo_documento: string,
        numero_documento: string,
        celular: string,
        fecha_nacimiento: Date,
        fecha_creacion: Date,
        status: true,
    },
    roles: [
        {
          idRol: 0,
          rolId: 0,
          permisos: [
            {
              idPermiso: 0,
              permiso_id: 0
            }
          ]
        }
      ],


}