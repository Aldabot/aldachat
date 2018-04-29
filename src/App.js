import React, { Component } from 'react';
import { Route } from 'react-router'

// Components
import Chat from './containers/Chat.js'

// Amplify
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react'

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
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Chat}/>
        <Route exact path="/about" component={About}/>
      </div>
    );
  }
}

export default App;
