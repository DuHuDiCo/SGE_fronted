import Roles from "./Roles"

export default class SuperAdmin {
    private username: string
    private email: string
    private password: string
    private nombres: string
    private apellidos: string
    private tipo_documento: string
    private numero_documento: string
    private celular: string
    private fecha_nacimiento: Date
    private status: boolean
    private roles: any[]

    constructor(password:string ) {

            this.username = "Duvan Diaz"
            this.email = "dudicodiaz@gmail.com"
            this.password = password
            this.nombres = "Duvan Humberto"
            this.apellidos = "Diaz Contreras"
            this.tipo_documento = "CC"
            this.numero_documento = "1118564418"
            this.celular = "3134916425"
            this.fecha_nacimiento = new Date("1996-09-02")
            this.status = true
            this.roles = [
                {
                    "rol": "SuperAdministrador"
                }
            ]

    }


   

}