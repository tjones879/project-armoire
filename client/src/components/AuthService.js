import decode from 'jwt-decode';
const TOKEN_STORAGE = 'token';

export default class AuthService{
    constructor(){
        this.loggedIn = this.loggedIn.bind(this);
    }
    loggedIn(){
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    getToken(){
        return localStorage.getItem(TOKEN_STORAGE);
    }
    logout(){
        localStorage.removeItem(TOKEN_STORAGE);
    }
    isTokenExpired(token){
        try{
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000){
                return true; //it is expired
            }else{
                return false; //it is not expired
            }
        }catch(err){
            return false;
        }
    }
}