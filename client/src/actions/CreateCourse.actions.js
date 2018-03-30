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
export function submitCourse(){
    dispatcher.dispatch({
        type:'SUBMIT_COURSE'
    });
}