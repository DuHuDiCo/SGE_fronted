export class Token {
    private _username: string = ''
    private _token: string = ''


    

    public get_username(): string {
        return this._username;
    }

    public set_username(_username: string): void {
        this._username = _username;
    }

    public get_token(): string {
        return this._token;
    }

    public set_token(_token: string): void {
        this._token = _token;
    }





}