import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
class dashboard extends Component {
    constructor(props) {
        super(props);
        this.onclick = this.onclick.bind(this);
        this.onclickprofile = this.onclickprofile.bind(this);
    this.state={
        redirect:false,
        profile:false,
        data:null
    }
    }
        renderRedirect(){
            if(this.state.redirect){
            return <Redirect to='/'/>}
            if(this.state.profile) {
                return <Redirect to={{pathname: '/profile',
                state: {data:this.state.data, userToken:this.props.location.state.userToken}}}
            />
            }
        }
        async onclickprofile(){
            Axios.post("https://conektapi.herokuapp.com/users/profile/",
            {
                usertoken:this.props.location.state.userToken
            }
            ).then(res =>{
                if(res.data.message){
                    console.log(res.data.data);
                    this.setState({
                        profile:true,
                        data:JSON.stringify(res.data.data)
                    })
                }
            })
        }
        async onclick(){
            Axios.get("https://conektapi.herokuapp.com/users/logout/"+this.props.location.state.userToken).then(res => {
                if (res.data.message) {
                 alert("LOGGED out successfully");
                 this.setState({redirect:true});
                }   
                
              })
              .catch(error => {
               alert(error.response.data.message, "danger");
              });
        }
    render() { 
        return ( <div>
            {this.renderRedirect()}
                <Button onClick={this.onclickprofile}>PROFILE</Button>
                <Button onClick={this.onclick}>LOGOUT</Button>
        </div> )
    }
}
 
export default dashboard;