import React, {Component} from 'react';

import {TextArea} from './textarea.component.react';

export class Tests extends Component{
    render(){
        return(
            <div>
                {this.props.elements.map(element =>
                    <div key={element} className="text-center tests">
                        <div className="heading">Test {element}</div>
                        <input className="default-input" type="text" placeholder="Test Label"
                               id={`L${element}`} name={`L${element}`} onChange={this.props.event}/>
                        <input style={{margin: 5}} type="checkbox" id={`Vis${element}`} name={`Vis${element}`} onChange={this.props.event} />
                        <label htmlFor={`Vis${element}`}>Visible to students</label>
                        <div className="txt-cen">
                            <TextArea event={this.props.event} type="text" id={`A${element}`} name={`A${element}`}/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}