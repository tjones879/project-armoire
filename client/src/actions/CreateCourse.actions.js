import dispatcher from '../dispatcher';

export function changeInput(which, value){
    dispatcher.dispatch({
        type:'CHANGE_INPUT',
        payload:{
            which,
            value
        }
    });
}