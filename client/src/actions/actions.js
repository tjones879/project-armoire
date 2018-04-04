import dispatcher from '../dispatcher';

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