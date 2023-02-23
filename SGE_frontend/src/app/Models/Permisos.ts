export default class Permisos {
    private idPermiso: number
    private permiso: string

    constructor(idPermiso: number, permiso: string) {
        this.idPermiso = idPermiso
        this.permiso = permiso
    }
    
    public getIdPermiso(): number {
        return this.idPermiso;
    }

    public setIdPermiso(idPermiso: number): void {
        this.idPermiso = idPermiso;
    }

    public getPermiso(): string {
        return this.permiso;
    }

    public setPermiso(permiso: string): void {
        this.permiso = permiso;
    }


   
}
