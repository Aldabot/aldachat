import React, { Component } from 'react';
import styled from 'styled-components'
import { StaggeredMotion, spring } from 'react-motion'
import { Menu, Icon, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const TabBar = styled(Row)`
  position: fixed !important;
  bottom: 0;
  left: 0;
  background-color: red;
  width: 100vw;
  z-index: 100;
`

const Tab = styled(Col)`
  padding: 5px !important;
  text-align: center !important;
`

const TabIcon = styled(Icon)`
  font-size: 2rem;
`

export class TabBarMenu extends Component {
  render() {
    return (
      <TabBar type="flex" justify="space-between" align="middle">
        <Tab span={4}>
          <Link to="/">
            <TabIcon type="home" />
          </Link>
        </Tab>
        <Tab span={4}>
          <Link to="/authenticator">
            <TabIcon type="question" />
          </Link>
        </Tab>
        <Tab span={4}>
          <Link to="/authenticator">
            <TabIcon type="team" />
          </Link>
        </Tab>
        <Tab span={4}>
          <Link to="/authenticator">
            <TabIcon type="book" />
          </Link>
        </Tab>
        <Tab span={4}>
          <Link to="/authenticator">
            <TabIcon type="unlock" />
          </Link>
        </Tab>
      </TabBar>
    )
  }
}

class MyMenu extends Component {
  menuSelect(item) {
    const { key } = item
    if(key === 'signOut') {
      this.props.signOut()
    }
  }

  renderAuthentificationMenuItem() {
    const { isLoggedIn } = this.props
    if(isLoggedIn) {
      return <Menu.Item key="signOut">Sign Out</Menu.Item>
    }
    return <Menu.Item key="signIn"><Link to="/authenticator">Sign In</Link></Menu.Item>
  }

  render() {
    const { location } = this.props.router;
    const selectedKeys = [];
    switch(location.pathname) {
      case '/':
        selectedKeys.push('home')
        break
      case '/authenticator':
        selectedKeys.push('signIn')
        break;
      default: break;
    }
    const menuItems = [
      <Menu.Item key="home" >
        <Link to="/" >Home</Link>
      </Menu.Item>,
      <Menu.Item key="blog">
        <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@alda_es" >Blog</a>
      </Menu.Item>,
      this.renderAuthentificationMenuItem()
    ]

    return (
      <StaggeredMotion
        defaultStyles={[{y: 30, opacity: 0}, {y: 30, opacity: 0}, {y: 30, opacity: 0}]}
        styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
            return i === 0
                 ? {y: spring(0), opacity: spring(1) }
                 : {y: spring(prevInterpolatedStyles[i - 1].y), opacity: spring(prevInterpolatedStyles[i - 1].opacity)}
        })}>
        {interpolatingStyles =>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['home']}
            selectedKeys={selectedKeys}
            onSelect={this.menuSelect}
            style={{lineHeight: '64px'}}
            >
            {interpolatingStyles.map((style, i) => {
               const compStyle = {position: 'relative', top: style.y, opacity: style.opacity}
               return React.cloneElement(menuItems[i], {style: compStyle})
            })}
          </Menu>
        }
      </StaggeredMotion>
    )
  }
}

MyMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
}

export default MyMenu

