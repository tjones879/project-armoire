import dispatcher from '../dispatcher';

export function getInfo(user){
    dispatcher.dispatch({
        type: 'GET_INFO',
        payload: {
            user
        }
    });
}

export function addExample(){
    dispatcher.dispatch({
        type:'ADD_EXAMPLE'
    });
}

export function addTest(){
    dispatcher.dispatch({
        type:'ADD_TEST'
    });
}

export function change(id, value){
    dispatcher.dispatch({
        type:'CHANGE',
        payload:{
            id:id,
            value:value
        }
    });
}

export function submit(){
    dispatcher.dispatch({
        type:'SUBMIT_ASSIGNMENT'
    });
}