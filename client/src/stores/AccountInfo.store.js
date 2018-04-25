import {EventEmitter} from 'events';
import dispatcer from '../dispatcher';

class ProfessorAccountInfoStore extends EventEmitter{
    constructor(){
        super();
        this.store = {
            status: false,
            user: {
                id: '',
                fname: '',
                lname: '',
                email: '',
                courseList: []
            },
            courses: [
                {
                    name: '',
                    number: '',
                    numberAssigns: 0,
                    nextDue: Date()
                }
            ],
            assignments: {
                past: [{
                    name: '',
                    openDate: Date(),
                    closeDate: Date(),
                    submissionCount: 0,
                    descript: '',
                    requirements: '',
                    tests: [{
                        label: ''
                    }]
                }],
                present: [{
                    name: '',
                    openDate: Date(),
                    closeDate: Date(),
                    submissionCount: 0,
                    descript: '',
                    requirements: '',
                    tests: [{
                        label: ''
                    }]
                }],
                future: [{
                    name: '',
                    openDate: Date(),
                    closeDate: Date(),
                    submissionCount: 0,
                    descript: '',
                    requirements: '',
                    tests: [{
                        label: ''
                    }]
                }]
            },
            submissions: [{
                fName: '',
                lName: '',
                id: '', // ObjectId
                srcCode: '',
                testResults: [{
                    id: 1,
                    state: true
                }],
                feedback: ''
            }],
            students: [{
                fName: '',
                lName: '',
                id: '',
            }]
        };
        this.getAll = this.getAll.bind(this);
    }

    getCourseList() {

    }

    getUserData(payload){
        this.store.user.id = payload.id;
        console.log("PAYLOAD ID:", payload.id);
        this.store.user.email = payload.email;
        fetch(`/professor/login_id/${payload.id}`, {
            method: 'GET',
        }).then(resp => resp.json()).then(obj => {
            if(obj.status === 'failure'){
                console.log("FAILURE: ", obj);
            } else {
                console.log("SUCCESS: ", obj);
                this.store.user.fname = obj.fname;
                this.store.user.lname = obj.lname;
                this.store.user.courseList = obj.courseList;
                this.store.user.id = obj.id;
                this.emit('change');
            }
        }).catch({
            // TODO: ERROR HANDLING
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

export const accountInfoStore = new ProfessorAccountInfoStore();
dispatcer.register(accountInfoStore.handleActions.bind(accountInfoStore));
