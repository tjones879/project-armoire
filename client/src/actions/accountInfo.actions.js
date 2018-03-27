import dispatcher from '../dispatcher';

export function getInfo(){
    dispatcher.dispatch({
        type:'GET_INFO'
    });
};
export function checkLoginStatus(){
    dispatcher.dispatch({
        type:'CHECK_LOGIN_STATUS'
    });
}
export function getUserData(){
    dispatcher.dispatch({
        type:'GET_USER_DATA'
    });
}