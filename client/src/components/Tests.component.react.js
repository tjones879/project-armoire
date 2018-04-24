import React, {Component} from 'react';

import {TextArea} from './textarea.component.react';

export class Tests extends Component{
    render(){
        return(
            <div>
                {this.props.elements.map(element =>
                    <div key={element} className="text-center tests">
                        <div className="heading">Test {element}</div>
                        <div className="row">
                            {/* <Input event={this.props.event} type="text" text={`Action ${element}`} id={`A${element}`} name={`A${element}`}/> */}
                            {/* <Input event={this.props.event} type="text" text={`Expected ${element}`} id={`E${element}`} name={`E${element}`}/> */}
                            <TextArea event={this.props.event} type="text" id={`A${element}`} name={`A${element}`}/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}