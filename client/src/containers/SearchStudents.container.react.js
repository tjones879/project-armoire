import React, {Component} from 'react';

import * as Actions from '../actions/actions';
import store from '../stores/SearchStudents.store';

import {Input} from '../components/input.component.react';
import {Btn} from '../components/Btn.component.react';

export class SearchStudentsContainer extends Component{
    constructor(props){
        super(props);
        this.state = store.getAll();
    }
    componentWillMount(){
        store.on("change", () => {
            this.setState(store.getAll());
        });
    }
    submit(event){
        Actions.submit("SEARCH_STUDENT");
        event.preventDefault();
    }
    change(event){
        Actions.change("SEARCH_STUDENT",event.target.id,event.target.value);
    }
    render(){
        return(
            <div>
                <form onSubmit={this.submit}>
                    <fieldset>
                        <legend>{this.props.title}</legend>
                        {this.state.elements.input.map(x => <Input type={x.type} text={x.text} id={x.id} key={x.id} name={x.name} event={this.change}/>)}
                        <div className="row text-center">
                            <div className="col">
                                <Btn type="submit" text="Search"/>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                {this.state.feedback}
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}