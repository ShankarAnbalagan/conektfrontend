import React, { Component } from 'react';
import {Button, Navbar, Nav, Card, Image, Form} from "react-bootstrap";
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import './profile.css'
class profile extends Component {

    constructor(props) {
        super(props);
        this.onclick = this.onclick.bind(this);
        this.onclickdashboard = this.onclickdashboard.bind(this);
        this.state={ redirect:false, dashboard:false,data:null }
        
    }

    componentWillMount(){
        this.setState({data:this.props.location.state.data});
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

    onclickdashboard(){
        this.setState({dashboard:true});
    }

    renderRedirect(){
        if(this.state.redirect){
        return <Redirect to='/'/>}
        if(this.state.dashboard) {
            return <Redirect to={{pathname: '/dashboard',
            state: {userToken:this.props.location.state.userToken}}}
        />
        }
    }

    render() { 
        return (<div>
                    {this.renderRedirect()}


                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home">Conekt</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link onClick={this.onclickdashboard}>Dashboard</Nav.Link>                            
                            </Nav>
                            <Nav>
                                <Button variant="danger" onClick={this.onclick}>Logout</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>


                    <Card style={{ width: '100%' }}>                    
                    <Card.Body>
                        <Card.Title>User Profile</Card.Title>
                        <div className='left'>
                            <Image width='200px' src={JSON.parse(this.state.data).profilePic} rounded/>
                        </div>
                        <Card.Text>
                        <Form className="">
                            <div>
                                <label>User Name: </label>
                                <input type='text' value={JSON.parse(this.state.data).userName}/>
                            </div>
                            <div>
                                <label>Branch/Department: </label><label className="normalLabel">{JSON.parse(this.state.data).branch}</label>
                            </div>
                            <div className="alignCenter">
                                <label>Bio: </label>
                                <textarea rows="4" value={JSON.parse(this.state.data).bio}/>
                            </div>
                            <Button variant="primary" width="5%">Save Changes</Button>
                        </Form>
                        </Card.Text>
                        
                    </Card.Body>                    
                    </Card>
                </div> 
            
        );
    }
}
 
export default profile;