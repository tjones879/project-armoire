import dispatcher from "../dispatcher";

export function setLock(bool){
    dispatcher.dispatch({
        type: "SET_LOCK",
        text: bool
    });
}
export function updateFeedback(mem,value){
    dispatcher.dispatch({
        type: "UPDATE_FEEDBACK",
        member: mem,
        text: value
    })
}
export function updateStyle(mem, obj){
    dispatcher.dispatch({
        type: "UPDATE_STYLE",
        member: mem,
        text: obj
    })
}
export function updateValue(mem, value){
    dispatcher.dispatch({
        type: "UPDATE_VALUE",
        member: mem,
        text: value
    })
}
export function checkPasses(){
    dispatcher.dispatch({
        type: "CHECK_PASSES"
    })
}
export function checkFields(){
    dispatcher.dispatch({
        type: "CHECK_FIELDS"
    })
}
export function lockDown(){
    dispatcher.dispatch({
        type: "LOCKDOWN"
    })
}