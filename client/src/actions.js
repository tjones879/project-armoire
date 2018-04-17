import dispatcher from './dispatcher'; //FLUX dispatcher
import _ from 'lodash'; //Check empty objects

/* The add action is used to update the DOM with a component
   or to add something to the database; thus, the payload is
   optional. i.e. Do not send a payload when adding a component
   to the DOM dynamically. Furthermore, the action takes a
   directory such as 'LOGIN' and a 'what' (as in 'add what?')
   such as 'BUTTON'. This will be dispatched as the constant
   'LOGIN_ADD_BUTTON' */
export function add(dir, what, payload){
    if(dir && what)
        dispatcher.dispatch({
            type:`${dir}_ADD_${what}`,
            payload
        });
}

/* The change action takes a directory such as 'LOGIN' along with a
   payload that includes the id of the element that is changing and
   the new value of the changing element.
   Lastly, an action to the path 'LOGIN' will be sent to the dispatcher
   as the constant, 'LOGIN_CHANGE' */
export function change(dir, id, value){
    if(dir && id)
        dispatcher.dispatch({
            type:`${dir}_CHANGE`,
            payload:{id,value}
        });
}

/* The start function takes in a directory such as 'LOGIN' and also
   takes an object as a payload that the store can manipulate in its
   implementation of the start function. The start action is used
   to initialize components.
   Lastly, an action to the path 'LOGIN will be sent to the dispatcher
   as the constant, 'LOGIN_START' */
export function start(dir, obj){
    if(dir && !_.isEmpty(obj))
        dispatcher.dispatch({
            type:`${dir}_START`,
            payload:obj
        });
}

/* The submit action takes a directory such as 'LOGIN'.
   Also, an action to the path 'LOGIN' will be sent to the dispatcher
   as the constant, 'LOGIN_SUBMIT' */
export function submit(dir){
    if(dir)
        dispatcher.dispatch({
            type:`${dir}_SUBMIT`
        });
}