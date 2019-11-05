import React, { Component } from "react";
import { Card, Button, Navbar, Nav } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import conekt from "./../conekt.png";
import commute from "./../commute.jpg";
import dorm from "./../dorm.jpg";
import notes from "./../notes.png";
class dashboard extends Component {
  constructor(props) {
    super(props);
    this.onclick = this.onclick.bind(this);
    this.onclickprofile = this.onclickprofile.bind(this);
    this.onclickcommute = this.onclickcommute.bind(this);
    this.onclicknotes = this.onclicknotes.bind(this);
    this.onclickdorm = this.onclickdorm.bind(this);
    this.state = {
      redirect: false,
      profile: false,
      data: null,
      commute: false,
      dorm: false,
      notes: false,
      data2:[]
    };
  }

  renderRedirect() {
    if (this.state.redirect) {
      // console.log("something");
      return <Redirect to="/" />;
    }
    if (this.state.commute) {
      // console.log("something");
      return (
        <Redirect
          to={{
            pathname: "/commute",
            state: {
              data: this.state.data2,
              userToken: this.props.location.state.userToken
            }
          }}
        />
      );
    }
    if (this.state.dorm) {
      // console.log("something");
      return (
        <Redirect
          to={{
            pathname: "/dorm",
            state: {
              data: this.state.data2,
              userToken: this.props.location.state.userToken
            }
          }}
        />
      );
    }
    if (this.state.notes) {
      // console.log("something");
      return (
        <Redirect
          to={{
            pathname: "/notes",
            state: {
              data: this.state.data2,
              userToken: this.props.location.state.userToken
            }
          }}
        />
      );
    }
    if (this.state.profile) {
      return (
        <Redirect
          to={{
            pathname: "/profile",
            state: {
              data: this.state.data,
              userToken: this.props.location.state.userToken
            }
          }}
        />
      );
    }
  }

  async onclickprofile() {
    Axios.post("https://conektapi.herokuapp.com/users/profile/", {
      usertoken: this.props.location.state.userToken
    }).then(res => {
      if (res.data.message) {
        console.log(res.data.data);
        this.setState({
          profile: true,
          data: JSON.stringify(res.data.data)
        });
      }
    });
  }

  async onclickcommute() {
    Axios.post("https://conektapi.herokuapp.com/posts/get-posts", {
      usertoken: this.props.location.state.userToken,
      category: "transport"
    }).then(res => {
      if (res.data.message) {
        if (res.data.data.length > 0) {
          // for(var i=0;i<res.data.data.length;i++)
          // {
          //     console.log(res.data.data[i].text)
          // }
          console.log(res.data.data);
          this.setState({
            data2:res.data.data,
            commute: true
          });
        }
        else{
          alert("no posts in commute")
        }
      }
    })
    .catch(error => {
      alert(error.response.data.message);
    });
  }
  async onclicknotes() {
    Axios.post("https://conektapi.herokuapp.com/posts/get-posts", {
      usertoken: this.props.location.state.userToken,
      category: "notes"
    }).then(res => {
      if (res.data.message) {
        if (res.data.data.length > 0) {
          // for(var i=0;i<res.data.data.length;i++)
          // {
          //     console.log(res.data.data[i].text)
          // }
          this.setState({
            data2: res.data.data,
            notes: true
          });
        }
        else{
          alert("no posts in notes")
        }
      }
    })
    .catch(error => {
      alert(error.response.data.message);
    });
  }
  async onclickdorm() {
    Axios.post("https://conektapi.herokuapp.com/posts/get-posts", {
      usertoken: this.props.location.state.userToken,
      category: "accomodation"
    }).then(res => {
      if (res.data.message) {
        if (res.data.data.length > 0) {
          // for(var i=0;i<res.data.data.length;i++)
          // {
          //     console.log(res.data.data[i].text)
          // }
          this.setState({
            data2: res.data.data,
            dorm: true
          });
        }
        else{
          alert("no posts in dorm")
        }
      }
    })
    .catch(error => {
      alert(error.response.data.message);
    });
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
        alert(error.response.data.message);
      });
  }
  render() {
    return (
      <div>
        <div>
          {this.renderRedirect()}

          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">
              <img src={conekt} alt="conekt" height="60px" />
            </Navbar.Brand>
            <h1>DASHBOARD</h1>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Button className="but" variant="dark" onClick={this.onclickprofile}>Profile</Button>
              </Nav>
              <Nav>
                <Button className="but" variant="danger" onClick={this.onclick}>Logout</Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div className="back" style={{ textAlign: "center", height:"100vh"}}>
          <div style={{ display: "inline-block", marginTop: "30px" }}>
            <Card
              style={{
                width: "18rem",
                height: "30rem",
                float: "right",
                margin: "20px"
              }}
            >
              <Card.Img variant="top" src={commute} />
              <Card.Body>
                <Card.Title>COMMUTE</Card.Title>
                <Card.Text>Give, Take and Share rides</Card.Text>
                <Button variant="dark" onClick={this.onclickcommute}>
                  Go
                </Button>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                height: "30rem",
                float: "right",
                margin: "20px"
              }}
            >
              <Card.Img variant="top" src={dorm} />
              <Card.Body>
                <Card.Title>DORM</Card.Title>
                <Card.Text>Find a place to stay</Card.Text>
                <Button variant="dark" onClick={this.onclickdorm}>
                  Go
                </Button>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                height: "30rem",
                float: "right",
                margin: "20px"
              }}
            >
              <Card.Img variant="top" src={notes} />
              <Card.Body>
                <Card.Title>NOTES</Card.Title>
                <Card.Text>Get help with study notes</Card.Text>
                <Button variant="dark" onClick={this.onclicknotes}>
                  Go
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default dashboard;
