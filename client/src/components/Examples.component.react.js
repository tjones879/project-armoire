import React, {Component} from 'react';

import {Input} from './input.component.react';

export class Examples extends Component{
    render(){
        return(
            <div>
                {this.props.elements.map(element =>
                    <div key={element} className="examples text-center">
                        <div className="heading">Example {element}</div>
                        <div className="row">
                            <div className="col sub-examples">
                                <Input event={this.props.event} type="text" text={`Input`} id={`I${element}`} name={`I${element}`}/>
                            </div>
                            <div className="col-1 arrow">
                                <img src="../images/arrow.png" width="75" height="50" alt="arrow png"/>
                            </div>
                            <div className="col sub-examples">
                                <Input event={this.props.event} type="text" text={`Output`} id={`O${element}`} name={`O${element}`}/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}