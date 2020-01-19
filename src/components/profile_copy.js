import React, { Component } from "react";
import { Button, Navbar, Nav, Card, Image} from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import "./profile.css";
import conekt from "./../conekt.png";
class profile extends Component {
  
  render() {
    return (
      <div>
        
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <img src={conekt} alt="conekt" height="60px" />
          </Navbar.Brand>
          <h1>PROFILE</h1>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button classname="but" variant="dark" onClick={this.onclickdashboard}>
                Dashboard
              </Button>
            </Nav>
            <Nav>
              <Button className="but" variant="danger" onClick={this.onclick}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="back" style={{ textAlign: "center" ,height:"100vh"}}>
          <div style={{ display: "inline-block", marginTop: "30px" }}>
        <Card style={{ width: "100vh", margin:"10px" }}>
              <Card.Body>
                <Card.Title><label>Username: </label> <input type="text"/></Card.Title>
                <div >
                  <Image
                    width="200px"
                    src="http://minecraftfaces.com/wp-content/bigfaces/big-sheep-face.png"
                    rounded
                  />
                  <br/>
                  <Button variant="link">Upload new picture</Button>
                </div>
                <Card.Text>
                  
                    
                    <div>
                      <label>Branch/Department: </label>
                      <label className="normalLabel">
                        Computer Science and Engineering
                      </label>
                    </div>
                    <div className="alignCenter">
                      <label>Bio: </label>
                      <textarea rows="5"></textarea>                      
                    </div>
                    
                 
                </Card.Text>
              </Card.Body>
            </Card>
            <Button>Save Changes</Button>
            </div>
</div>
      </div>
    );
  }
}

export default profile;
