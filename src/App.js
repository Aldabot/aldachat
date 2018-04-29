import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Row, Col, Menu, Spin } from 'antd'

// Components
import Chat from './containers/Chat.js'
import Authenticator from './component/authenticator'

// Amplify
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from './aws-exports'

// Styling
import styled from 'styled-components';
import './App.css';
import 'antd/dist/antd.css';

Amplify.configure(aws_exports)
const { Header, Content } = Layout

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      user: {},
      isLoading: true
    }

    this.handleMenu = this.handleMenu.bind(this)
  }

  async componentDidMount() {
    const user = await Auth.currentUserInfo()
    if( user === null ) {
      this.setState({ isLoading: false })
    } else {
      this.setState({
        isLoading: false,
        user,
        isLoggedIn: true
      })
    }
  }

  async signOut() {
    await Auth.signOut()
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  handleMenu(item) {
    const { key } = item
    if(key === 'signOut') {
      this.signOut()
    }
  }

  renderAuthentificationMenuItem() {
    const { isLoggedIn } = this.state
    if(isLoggedIn) {
      return <Menu.Item key="signOut">Sign Out</Menu.Item>
    }
    return <Menu.Item key="signIn"><Link to="/authenticator">Sign In</Link></Menu.Item>
  }

  renderContent() {
    const { isLoading } = this.state
    if (isLoading) {
      return <Spin size="large"/>
    }

    return (
      <Fragment>
        <Route exact path="/" component={Chat}/>
        <Route exact path="/authenticator" component={Authenticator} />
      </Fragment>
    )
  }

  render() {
    return (
      <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['alda']}
            style={{lineHeight: '64px'}}
            onClick={this.handleMenu}
          >
            <Menu.Item key="alda"><Link to="/">Alda</Link></Menu.Item>
            <Menu.Item key="blog"><a href="https://medium.com/@rosinol.gabriel" rel="noopener noreferrer" target="_blank">Blog</a></Menu.Item>
            {this.renderAuthentificationMenuItem()}
          </Menu>
        </Header>
        <Content style={{backgroundColor: 'white', paddingTop: '16px', textAlign: 'center'}}>
          {this.renderContent()}
        </Content>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return { router: state.router }
}

export default withRouter(connect(mapStateToProps)(App));
