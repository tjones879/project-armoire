import React, {Component} from 'react';

import AuthService from '../components/AuthService';

export class ExactCoursePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            user: {}
        }
        this.Auth = new AuthService();
    }
    componentWillMount(){
        try{
            if(this.Auth.loggedIn()){
                this.setState({user:this.Auth.getInfo().user}, ()=> {
                    fetch(`../student/login_id/${this.state.user.id}`).then(x => x.json()).then(payload => {
                        let courses = payload.courses;
                        let found = false;
                        for(let i = 0; i < courses.length; i++){
                            if(courses[i].id === this.state.id){
                                found = true;
                            }
                        }
                        if(!found){
                            window.location = '../course';
                        }
                        console.log(courses);
                    }).catch(err => {
                        console.log(err.message);
                    });
                });
            }else{
                window.location = 'login';
            }
        }catch(err){
            console.log(err.message);
            window.location = 'login';
        }
    }
    render(){
        return(
            <div>
            </div>
        );
    }
}