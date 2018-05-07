import {EventEmitter} from 'events';
import dispatcer from '../dispatcher';

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
        this.getAll = this.getAll.bind(this);
    }

    getUserData(payload){
        this.store.user.id = payload.id;
        this.store.user.email = payload.email;
        fetch('/api/v1/student',{
            method: 'POST',
            body:JSON.stringify({
                id: this.store.user.id,
                email: this.store.user.email
            }),
            headers:{
                'content-type':'application/json',
                'Authorization': `Bearer ${payload.token}`
            }
        }).then(payload => payload.json()).then(obj => {
            if(obj.status === 'failure'){
                fetch('/api/v1/professor',{
                    method: 'POST',
                    body:JSON.stringify({
                        id: this.store.user.id,
                        email: this.store.user.email
                    }),
                    headers:{
                        'content-type':'application/json',
                        'Authorization': `Bearer ${payload.token}`
                    }
                }).then(payload => payload.json()).then(obj => {
                    if(obj.status === 'failure'){
                        console.log('user not found');
                    }else{
                        this.store.user.fname = obj[0].fname;
                        this.store.user.lname = obj[0].lname;
                        this.store.user.classification = 'professor';
                        this.emit('change');
                    }
                }).catch({

                });
            }else{
                console.log(obj);
                this.store.user.fname = obj.fname;
                this.store.user.lname = obj.lname;
                this.store.user.classification = 'student';
                this.emit('change');
            }
        }).catch({

        }); 
    }

    getAll(){
        return this.store;
    }

    handleActions(action){
        switch(action.type){
            case 'ACCOUNT_INFO_START': {
                this.getUserData(action.payload);
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
