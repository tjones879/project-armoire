import React, {Component} from 'react';

import {Input} from './input.component.react';

export class Examples extends Component{
    render(){
        return(
            <div>
                {this.props.elements.map(element =>
                    <div key={element}>
                        <Input event={this.props.event} type="text" text={`Input ${element}`} id={`I${element}`} name={`I${element}`}/>
                        <Input event={this.props.event} type="text" text={`Output ${element}`} id={`O${element}`} name={`O${element}`}/>
                    </div>
                )}
            </div>
        );
    }
}