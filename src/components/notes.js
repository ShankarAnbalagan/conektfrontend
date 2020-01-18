import React, { Component } from "react";
import { Navbar, Nav, Card, Button } from "react-bootstrap";
import conekt from "./../conekt.png";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Miniform from "./Miniform";
class notes extends Component {
  constructor(props) {
    super(props);
    this.onclick = this.onclick.bind(this);
    this.onclicknewpost = this.onclicknewpost.bind(this);
    this.gettext = this.gettext.bind(this);
    this.onclickdashboard = this.onclickdashboard.bind(this);
    this.state = {
      redirect: false,
      dashboard: false,
      data: null,
      createpost: false,
      post: ""
    };
  }

  componentWillMount() {
    this.setState({ data: this.props.location.state.data });
  }

  onclicknewpost() {
    this.setState({
      createpost: true
    });
  }

  async gettext(e) {
    e.preventDefault();
    const post = e.target.elements.post.value;
    console.log(post);
    if (post) {
      Axios.post("https://conektapi.herokuapp.com/posts/create-post", {
        usertoken: this.props.location.state.userToken,
        text: post,
        postCategory: "notes",
        parentPost: "root"
      })
        .then(res => {
          if (res.data.message) {
            this.setState({
              createpost: false
            });
            alert("Done! Redirecting you back to dashboard");
            this.setState({
              dashboard: true
            });
          }
        })
        .catch(error => {
          this.setState({
            createpost: false
          });
          alert(error);
        });
    }
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
    const obj = this.state.data.map(({ opId, opName, text, displayTime }) => {
      return (
        <Card body style={{ margin: "4px" }}>
          <h4 key={opId}>{text}</h4>
          <p>
            Posted by: {opName} on {displayTime}
          </p>
          <Button variant="dark" style={{ float: "right" }}>
            Comment
          </Button>
        </Card>
      );
    });
    return (
      <div>
        {this.renderRedirect()}
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <img src={conekt} alt="conekt" height="60px" />
          </Navbar.Brand>
          <h1>#NOTES</h1>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button
                className="but"
                variant="dark"
                onClick={this.onclicknewpost}
              >
                CreateNewPost
              </Button>
            </Nav>
            <Nav>
              <Button
                className="but"
                variant="dark"
                onClick={this.onclickdashboard}
              >
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
        {this.state.createpost ? <Miniform gettext={this.gettext} /> : null}
        <div className="back" style={{ height: "100%" }}>
          <div>{obj}</div>
        </div>
      </div>
    );
  }
}

export default notes;
