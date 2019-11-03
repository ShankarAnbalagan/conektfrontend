import React, { Component } from 'react';
class profile extends Component {
    state = {  }
    render() { 
        return ( <div>{this.props.location.state.data}</div> );
    }
}
 
export default profile;