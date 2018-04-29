import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Spin } from 'antd'

// Components
import Chat from './containers/Chat.js'
import Authenticator from './component/authenticator'
import { addMessage } from './actions/index'

// Amplify
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from './aws-exports'

// Redux
import {
  signIn,
  signOut
} from './actions/authenticator'

// Styling
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
    // chk if user logged in
    // -> send greeting
    const user = await Auth.currentUserInfo()

    if( user === null ) {
      this.props.signOut()
      this.props.addMessage({ content: '¡Enhorabuena! Acabas de dar con la mejor asesora financiera de España' })
      this.props.addMessage({ content: 'Por ahora puedo ayudarte a buscar el préstamo que mejor se ajusta a tus necesidades o a invertir tus ahorros en función de tu perfil.' })
      this.setState({ isLoading: false })
    } else {
      this.props.signIn(user)
      this.props.addMessage({ content: `Hola, ${user.username} 😍😍😍` })
      this.props.addMessage({ content: '¿En que puedo ayudarte?' })
      this.setState({
        isLoading: false,
        user,
        isLoggedIn: true
      })
    }
  }

  async signOut() {
    await Auth.signOut()
    this.props.signOut()
  }

  handleMenu(item) {
    const { key } = item
    if(key === 'signOut') {
      this.signOut()
    }
  }

  renderAuthentificationMenuItem() {
    const { isLoggedIn } = this.props.user
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
    console.log(this.props)
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
  return {
    router: state.router,
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addMessage: (message) => {dispatch(addMessage(message))},
    signIn: () => dispatch(signIn()),
    signOut: () => dispatch(signOut())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
