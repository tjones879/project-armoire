import {EventEmitter} from 'events';
import dispatcer from '../dispatcher';
import AuthService from '../components/AuthService';

class AccountInfoStore extends EventEmitter{
    constructor(){
        super();
        this.store = {
            status: false,
            user:{
                fname: '',
                lname: '',
                email: '',
                classification: ''
            }
        };

        this.Auth = new AuthService();

        this.getAll = this.getAll.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.checkLoginStatus = this.checkLoginStatus.bind(this);
    }

    getInfo(){

    }

    checkLoginStatus(){
        if(this.Auth.loggedIn()){
            this.store.status = true;
            this.emit('change');
        }else{
            this.store.status = false;
            this.emit('no clearance');
        }
    }

    getAll(){
        return this.state;
    }

    handleActions(action){
        switch(action.type){
            case 'GET_INFO': {
                this.getInfo();
                break;
            }
            case 'CHECK_LOGIN_STATUS': {
                this.checkLoginStatus();
                break;
            }
            default: {
                break;
            }
        }
    }
} 

export const accountInfoStore = new AccountInfoStore();
dispatcer.register(accountInfoStore.handleActions.bind(accountInfoStore));