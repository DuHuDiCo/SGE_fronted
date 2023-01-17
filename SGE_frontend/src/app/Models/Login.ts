export default class Login {
    constructor(private username:string, private password:string){}

    set setUsername(username:string){
        this.username = username;
    }

    get getUsername(){
        return this.username;
    }

    
    set setPassword(password:string){
        this.password = password;
    }

    get getPassword(){
        return this.password;
    }
}

export type Datos = {
    username:"",
    password:""
}