import dispatcher from "../dispatcher";

export function updateFeedback(mem, value){
    dispatcher.dispatch({
        type:"UPDATE_FEEDBACK",
        member: mem,
        text: value
    })
}

export function updateValue(mem, value){
    dispatcher.dispatch({
        type:"UPDATE_VALUE",
        member: mem,
        text: value
    })
}

export function login(){
    dispatcher.dispatch({
        type:"LOGIN"
    })
}

export function lockdown(){
    dispatcher.dispatch({
        type:"LOCKDOWN"
    })
}

export function logout(){
    dispatcher.dispatch({
        type:"LOGOUT"
    })
}

export function loggedIn(){
    dispatcher.dispatch({
        type:"LOGGEDIN"
    })
}