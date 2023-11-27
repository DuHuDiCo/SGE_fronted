export type CuentasCobrarResponse = {
    idCuentasPorCobrar: 0,
    numeroObligacion: string,
    cliente: string,
    documentoCliente: string,
    fechaCuentaCobrar: Date,
    fechaVencimiento: Date,
    tipo: string,
    valorNotaDebito: 0,
    valorCuota: 0,
    valorPagos: 0,
    nombre_usuario: string,
    clasificacion: string,
    vendedor: string,
    clasificacionJuridica: string,
    detalle: string,
    sede: {
      idSede: 0,
      sede: string
    },
    banco: {
      idBanco: 0,
      banco: string
    },
    diasVencidos: 0,
    edadVencimiento: string,
    condicionEspecial: string,
    numeroCreditos: 0,
    pagare: string,
    moraObligatoria: 0,
    cuotasMora: 0,
    cuotas: 0,
    asesorCarteraResponse: {
      idAsesorCartera: 0,
      usuario: {
        idUsuario: 0,
        username: string,
        email: string,
        nombres: string,
        apellidos: string,
        sede: string,
        tipo_documento: string,
        numero_documento: string,
        celular: string,
        fecha_nacimiento: Date,
        fecha_creacion: Date,
        status: true,
        roles: [
          {
            idRol: 0,
            rol: string,
            permisos: [
              {
                idPermiso: 0,
                permiso: string
              }
            ]
          }
        ],
        enabled: true,
        password: string,
        authorities: [
          {
            authority: string
          }
        ],
        credentialsNonExpired: true,
        accountNonExpired: true,
        accountNonLocked: true
      }
    },
    clientes: [
      {}
    ]
  }