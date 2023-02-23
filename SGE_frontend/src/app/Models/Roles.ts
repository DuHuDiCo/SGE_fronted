import Permisos from "./Permisos"

export default class Roles {
    private idRol: number
    rol: string
    private permisos: Permisos[]

    constructor(idRol: number, rol: string, permisos: Permisos[]) {
        this.idRol = idRol
        this.rol = rol
        this.permisos = permisos
    }

    public getIdRol(): number {
        return this.idRol;
    }

    public setIdRol(idRol: number): void {
        this.idRol = idRol;
    }

    public getRol(): string {
        return this.rol;
    }

    public setRol(rol: string): void {
        this.rol = rol;
    }

    public getPermisos(): Permisos[] {
        return this.permisos;
    }

    public setPermisos(permisos: Permisos[]): void {
        this.permisos = permisos;
    }



}