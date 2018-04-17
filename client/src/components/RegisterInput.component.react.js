import React from 'react'

const RegisterInput = properties => 
    <div className="row">
        <label className="col text-right" htmlFor={properties.id}>{properties.text}:</label>
        <input className="col text-center" value={properties.element.value} id={properties.id} type={properties.type} onChange={properties.event} disabled={properties.element.lock} required/>
        <span className="col text-left" style={properties.element.style}>{properties.element.feed}</span>
    </div>
;

export default RegisterInput;