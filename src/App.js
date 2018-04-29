import React, { Component } from 'react';
import { Route } from 'react-router'
import { Link } from 'react-router-dom'

// Components
import Chat from './containers/Chat.js'
import Authenticator from './component/authenticator'

// Amplify
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from './aws-exports'

// Styling
import './App.css';
import 'antd/dist/antd.css';

Amplify.configure(aws_exports)

const About = () => {
  return (
    <div>About</div>
  )
}

class App extends Component {
  async getAuthenticatedUser() {
    const user = await Auth.currentUserInfo()
    const cognitoId = user.id
  }

  render() {
    return (
      <div className="App">
        <Link to="/authenticator">Sign In</Link>
        <Route exact path="/" component={Chat}/>
        <Route exact path="/authenticator" component={Authenticator}/>
      </div>
    );
  }
}

export default App;
