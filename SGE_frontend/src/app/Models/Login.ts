export default class Login {

    private username: string
    private password: string

    
    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }

    public get_username(): string {
        return this.username;
    }

    public set_username(_username: string): void {
        this.username = _username;
    }

    public get_password(): string {
        return this.password;
    }

    public set_password(_password: string): void {
        this.password = _password;
    }







}

