import React, { Component } from "react";
import { Button, Navbar, Nav, Card, Image, Form } from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import "./profile.css";
import conekt from "./../conekt.png";
class profile extends Component {
  constructor(props) {
    super(props);
    this.onclick = this.onclick.bind(this);
    this.onclickdashboard = this.onclickdashboard.bind(this);
    this.state = { redirect: false, dashboard: false, data: null };
  }

  componentWillMount() {
    this.setState({ data: this.props.location.state.data });
  }

  async onclick() {
    Axios.get(
      "https://conektapi.herokuapp.com/users/logout/" +
        this.props.location.state.userToken
    )
      .then(res => {
        if (res.data.message) {
          alert("LOGGED out successfully");
          this.setState({ redirect: true });
        }
      })
      .catch(error => {
        alert(error.response.data.message, "danger");
      });
  }

  onclickdashboard() {
    this.setState({ dashboard: true });
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.dashboard) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { userToken: this.props.location.state.userToken }
          }}
        />
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}

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
                <Card.Title>{JSON.parse(this.state.data).userName}</Card.Title>
                <div >
                  <Image
                    width="200px"
                    src={JSON.parse(this.state.data).profilePic}
                    rounded
                  />
                </div>
                <Card.Text>
                  
                    
                    <div>
                      <label>Branch/Department: </label>
                      <label className="normalLabel">
                        {JSON.parse(this.state.data).branch}
                      </label>
                    </div>
                    <div className="alignCenter">
                      <label>Bio: </label>
                      {JSON.parse(this.state.data).bio}
                      
                    </div>
                    
                 
                </Card.Text>
              </Card.Body>
            </Card>
<Button variant="light" className="but" style={{width:"100vh"}}>Edit Profile</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default profile;
