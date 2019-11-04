import React, { Component } from 'react';
import {Button, Navbar, Nav, Card, Image} from "react-bootstrap";
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
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
                            <Nav.Link  onClick={this.onclick}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>


                    <Card style={{ width: '100%' }}>                    
                    <Card.Body>
                        <Card.Title>User Profile</Card.Title>
                        <div>
                            <label>Profile Picture: </label>
                            <Image width='10%' src={JSON.parse(this.state.data).profilePic} roundedCircle/>
                        </div>
                        <Card.Text>
                        <div>
                            <label>User Name: </label>
                            <input type='text' value={JSON.parse(this.state.data).userName}/>
                        </div>
                        <div>
                            <label>Branch/Department: {JSON.parse(this.state.data).branch}</label>
                        </div>
                        <div>
                            <label>Bio: </label>
                            <textarea rows="4" value={JSON.parse(this.state.data).bio}/>
                        </div>
                        </Card.Text>
                        <Button variant="primary" width="5%">Save Changes</Button>
                    </Card.Body>                    
                    </Card>
                </div> 
            
        );
    }
}
 
export default profile;