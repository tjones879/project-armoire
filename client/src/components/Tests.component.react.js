import React, {Component} from 'react';
import AceEditor from 'react-ace';

// import {CodeArea} from './codearea.component.react';

export class Tests extends Component{
    render(){
        return(
            <div>
                {this.props.elements.map(element =>
                    <div key={element} className="text-center tests">
                        <AceEditor onChange={this.props.event} text={`Test ${element}`} id={`A${element}`} name={`A${element}`} mode="python" theme="monokai" editorProps={{
                                $blockScrolling: true
                            }}
                            setOptions={{
                                enableLiveAutocompletion: true
                            }}
                        />
                        <div className="heading">Test {element}</div>
                        <div className="txt-cen">
                            <TextArea event={this.props.event} type="text" id={`A${element}`} name={`A${element}`}/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}