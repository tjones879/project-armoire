import React from 'react';
import {Component} from 'react';
import {Btn} from '../components/Btn.component.react';
import {AccountInfoBox} from '../components/AccountInfoBox.component.react';
import {accountInfoStore} from '../stores/AccountInfo.store';
import {Courses} from '../containers/Courses.container.react';

export class AccountInfo extends Component{
    constructor(props){
        super(props);
        this.state = accountInfoStore.getAll();
    }
    componentWillMount(){
        accountInfoStore.on("change", () => 
            this.setState(accountInfoStore.getAll())
        )
    }
    render(){
        return(
            <div>
                <div className='row content-area'>
                <div className="col text-left">
                    <div className="dashboard cap">{this.state.user.classification} Dashboard</div>
                </div>
                    <div className='col text-right'>
                        <AccountInfoBox user={{
                            fname: this.state.user.fname,
                            lname: this.state.user.lname,
                            email: this.state.user.email,
                            classification: this.state.user.classification 
                        }}/>
                        <Btn text='Change Info' id='changeInfoBtn' event={()=>{window.location = 'account/change'}}/>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <div className="content-area half">
                            Courses
                            <Courses courses={this.state.courses}/>
                        </div> 
                    </div>
                    <div className="col">
                        <div className="content-area half">
                            Assignments
                        </div> 
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <div className="content-area half">
                            Assignment View
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}