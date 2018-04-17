import dispatcher from '../dispatcher';

export function changeNavbar(payload){
    dispatcher.dispatch({
        type:"NAVBAR_CHANGE",
        payload:payload
    });
}

export function change(dir, id, value){
    let payload = null;
    switch(dir){
        case "SEARCH_STUDENT":{
            payload = {
                type:"CHANGE_STUDENT_SEARCH",
                payload:{
                    id:id,
                    value:value
                }
            };
            break;
        }
        case "ASSIGNMENT_SUBMISSION":{
            payload = {
                type:"ASSIGNMENT_SUBMISSION_CHANGE",
                payload:{
                    id:id,
                    value:value
                }
            }
            break;
        }
        case "ACCOUNT_CHANGE":{
            payload = {
                type:"ACCOUNT_CHANGE_CHANGE",
                payload:{
                    id:id,
                    value:value
                }
            }
            break;
        }
        case "LOGIN":
            payload = {
                type:"LOGIN_CHANGE",
                payload:{
                    id:id,
                    value:value
                }
            };
            break;
        case "REGISTER":{
            payload = {
                type:"REGISTER_CHANGE",
                payload:{
                    id:id,
                    value:value
                }
            };
            break;
        }
        default:{
            break;
        }
    }
    if(payload != null){
        dispatcher.dispatch(payload);
    }
}
export function submit(dir){
    let payload = null;
    switch(dir){
        case "SEARCH_STUDENT":{
            payload = {
                type:"SUBMIT_SEARCH_STUDENT"
            }
            break;
        }
        case "ASSIGNMENT_SUBMISSION":{
            payload = {
                type:"ASSIGNMENT_SUBMISSION_SUBMIT"
            }
            break;
        }
        case "ACCOUNT_CHANGE":{
            payload = {
                type:"ACCOUNT_CHANGE_SUBMIT"
            }
            break;
        }
        case "LOGIN":
            payload = {
                type:"LOGIN_SUBMIT"
            };
            break;
        case "REGISTER":
            payload = {
                type:"REGISTER_SUBMIT"
            }
            break;
        default:{
            break;
        }
    }
    if(payload != null){
        dispatcher.dispatch(payload);
    }
}
export function user(dir, user){
    let payload = null;
    switch(dir){
        case "SEARCH_STUDENT":{
            payload = {
                type: "USER_SEARCH_STUDENT",
                payload: {
                    user:user
                }
            }
            break;
        }
        default:{
            break;
        }
    }
    if(payload != null){
        dispatcher.dispatch(payload);
    }
}

export function addStudentToCourse(id){
    dispatcher.dispatch({
        type:"ADD_STUDENT_TO_COURSE",
        payload:{
            id:id
        }
    });
}

export function start(dir, obj){
    let payload = {};
    switch(dir){
        case "COURSES":{
            payload = {
                type:"COURSES_START",
                payload:{
                    user:obj
                }
            };
            break;
        }
        case "ASSIGNMENT_SUBMISSION":{
            payload = {
                type:"ASSIGNMENT_SUBMISSION_START",
                payload:{
                    user:obj.user,
                    id:obj.id
                }
            };
            break;
        }
        case "NAVBAR":{
            payload = {
                type:"NAVBAR_START",
                payload:obj
            }
            break;
        }
        case "ACCOUNT_CHANGE":{
            payload = {
                type:"ACCOUNT_CHANGE_START",
                payload:obj
            }
            break;
        }
        default:{
            break;
        }
    }
    dispatcher.dispatch(payload);
}

export function courseInit(id, user){
    dispatcher.dispatch({
        type:"COURSE_INIT",
        payload:{
            id:id,
            user:user
        }
    });
}