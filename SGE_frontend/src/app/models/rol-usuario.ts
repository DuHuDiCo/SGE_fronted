export class RolUsuario {
    private idRol:number;
    private rol:string;
    private permisos:any =[]


    constructor(idRol:number, rol:string, permisos:any[]){
        this.idRol = idRol;
        this.rol = rol;
        this.permisos = permisos;
    }

    

}
