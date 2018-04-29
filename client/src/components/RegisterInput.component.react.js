import React from 'react'

const RegisterInput = properties =>
    <div> 
        <div className="row">
            <div className="col text-center">
                <input className="default-input" placeholder={properties.text} value={properties.element.value} id={properties.id} type={properties.type} onChange={properties.event} disabled={properties.element.lock} required/>
            </div>
        </div>
        <div className="row">
            <span className="col text-center feedback" id={`${properties.id}Feedback`} style={properties.element.style}>{properties.element.feed}</span>
        </div>
    </div>
;

export default RegisterInput;