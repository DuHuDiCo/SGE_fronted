export type Reporte = {
    totalPages: number,
    totalElements: number,
    size: number,
    content: [
      {
        idReporte: number,
        nombreReporte: string,
        ruta: string,
        fechaReporte: Date,
        usuarioId: number,
        tipoReporte: string
      }
    ],
    number: number,
    sort: {
      empty: boolean,
      unsorted: boolean,
      sorted: boolean
    },
    first: boolean,
    last: boolean,
    numberOfElements: number,
    pageable: {
      offset: number,
      sort: {
        empty: boolean,
        unsorted: boolean,
        sorted: boolean
      },
      pageNumber: number,
      pageSize: number,
      unpaged: boolean,
      paged: boolean
    },
    empty: boolean
  }