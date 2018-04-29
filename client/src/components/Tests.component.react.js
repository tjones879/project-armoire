import React, {Component} from 'react';
import AceEditor from 'react-ace';

// import {CodeArea} from './codearea.component.react';

export class Tests extends Component{
    render(){
        return(
            <div>
                {this.props.elements.map(element =>
                    <div key={element}>
                        {/* <Input event={this.props.event} type="text" text={`Action ${element}`} id={`A${element}`} name={`A${element}`}/> */}
                        {/* <Input event={this.props.event} type="text" text={`Expected ${element}`} id={`E${element}`} name={`E${element}`}/> */}
                        {/* <CodeArea event={this.props.event} text={`Test ${element}`} id={`A${element}`} name={`A${element}`}/> */}
                        <AceEditor onChange={this.props.event} text={`Test ${element}`} id={`A${element}`} name={`A${element}`} mode="python" theme="monokai" editorProps={{
                        $blockScrolling: true
                    }}
                    setOptions={{
                        enableLiveAutocompletion: true
                    }}/>
                    </div>
                )}
            </div>
        );
    }
}