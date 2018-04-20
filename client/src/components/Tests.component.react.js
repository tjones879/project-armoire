import React, {Component} from 'react';

import {CodeArea} from './codearea.component.react';

export class Tests extends Component{
    render(){
        return(
            <div>
                {this.props.elements.map(element =>
                    <div key={element}>
                        {/* <Input event={this.props.event} type="text" text={`Action ${element}`} id={`A${element}`} name={`A${element}`}/> */}
                        {/* <Input event={this.props.event} type="text" text={`Expected ${element}`} id={`E${element}`} name={`E${element}`}/> */}
                        <CodeArea event={this.props.event} type="text" text={`Test ${element}`} id={`A${element}`} name={`A${element}`}/>
                    </div>
                )}
            </div>
        );
    }
}