import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
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
      commute:false,
      dorm:false,
      notes:false
    };
  }
  renderRedirect() {
    if (this.state.redirect) {
      console.log("something");
      return <Redirect to="/" />;
    }
    if (this.state.commute) {
        console.log("something");
        return <Redirect to="/commute" />;
      }
      if (this.state.dorm) {
        console.log("something");
        return <Redirect to="/dorm" />;
      }
      if (this.state.notes) {
        console.log("something");
        return <Redirect to="/notes" />;
      }
    if (this.state.profile) {
      return (
        <Redirect
          to={{ pathname: "/profile", state: { data: this.state.data } }}
        />
      );
    }
  }

  async onclickcommute(){
      Axios.post("https://conektapi.herokuapp.com/posts/get-posts",{
          usertoken: this.props.location.state.userToken,
          category:"transport"
      }).then(res=>{
          if(res.data.message){
              if(res.data.data.length> 0 ){
                for(var i=0;i<res.data.data.length;i++)
                {
                    console.log(res.data.data[i].text)
                }
              }
          }
      }).catch(error => {
        alert(error.response.data.message);
      });
  }
  async onclicknotes(){
    Axios.post("https://conektapi.herokuapp.com/posts/get-posts",{
        usertoken: this.props.location.state.userToken,
        category:"notes"
    }).then(res=>{
        if(res.data.message){
            console.log(res.data.data.length);
        }
    }).catch(error => {
        alert(error.response.data.message);
      });
}
async onclickdorm(){
    Axios.post("https://conektapi.herokuapp.com/posts/get-posts",{
        usertoken: this.props.location.state.userToken,
        category:"accomodation"
    }).then(res=>{
        if(res.data.message){
            console.log(res.data.data.length);
        }
    }).catch(error => {
        alert(error.response.data.message);
      });
}
  async onclickprofile() {
    Axios.post("https://conektapi.herokuapp.com/users/profile/", {
      usertoken: this.props.location.state.userToken
    }).then(res => {
      if (res.data.message) {
        this.setState({
          profile: true,
          data: res.data.data
        });
      }
    }).catch(error => {
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
        alert(error.response.data.message, "danger");
      });
  }
  render() {
    return (
      <div>
        <div>
          {this.renderRedirect()}

          <img src={conekt} alt="conekt" height="60px" />

          <Button className="navbarr" onClick={this.onclickprofile}>
            PROFILE
          </Button>

          <Button className="navbarr" onClick={this.onclick}>
            LOGOUT
          </Button>
        </div>
        <div style={{textAlign:"center"}}>
        <div style={{display:"inline-block",marginTop:"30px"}}>
          <Card style={{ width: "18rem" ,height:"30rem",float:"right",margin:"20px"}}>
            <Card.Img variant="top" src={commute}  />
            <Card.Body>
              <Card.Title>COMMUTE</Card.Title>
              <Card.Text>
                Give, Take and Share rides 
              </Card.Text>
              <Button onClick={this.onclickcommute} variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", height:"30rem",float:"right",margin:"20px"}}>
            <Card.Img variant="top" src={dorm}  />
            <Card.Body>
              <Card.Title>DORM</Card.Title>
              <Card.Text>
                Find a place to stay
              </Card.Text>
              <Button onClick={this.onclickdorm} variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem",height:"30rem", float:"right",margin:"20px"}}>
            <Card.Img variant="top" src={notes}  />
            <Card.Body>
              <Card.Title>NOTES</Card.Title>
              <Card.Text>
                Get help with study notes
              </Card.Text>
              <Button onClick={this.onclicknotes} variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      </div>
    );
  }
}

export default dashboard;
