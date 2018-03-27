import {EventEmitter} from 'events';
import dispatcer from '../dispatcher';
import AuthService from '../components/AuthService';

class AccountInfoStore extends EventEmitter{
    constructor(){
        super();
        this.store = {
            status: false,
            user:{
                id: '',
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

    getUserData(){
        if(this.Auth.loggedIn()){
            let returnObj = this.Auth.getInfo();
            this.store.user.id = returnObj.user.id;
            this.store.user.email = returnObj.user.email;
            fetch('http://localhost:3000/student',{
                method: 'POST',
                body:JSON.stringify({
                    id: this.store.user.id,
                    email: this.store.user.email
                }),
                headers:{
                    'content-type':'application/json',
                    'Authorization': `Bearer ${this.Auth.getToken()}`
                }
            }).then(payload => payload.json()).then(obj => {
                if(obj.status === 'failure'){
                    fetch('http://localhost:3000/professor',{
                        method: 'POST',
                        body:JSON.stringify({
                            id: this.store.user.id,
                            email: this.store.user.email
                        }),
                        headers:{
                            'content-type':'application/json',
                            'Authorization': `Bearer ${this.Auth.getToken()}`
                        }
                    }).then(payload => payload.json()).then(obj => {
                        if(obj.status === 'failure'){
                            console.log('user not found');
                        }else{
                            console.log(obj);
                        }
                    }).catch({

                    });
                }
                console.log(obj);
                this.emit('change');
            }).catch({

            }); 
        }
    }

    getAll(){
        return this.store;
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
            case 'GET_USER_DATA': {
                this.getUserData();
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