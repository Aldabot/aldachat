import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StaggeredMotion, spring } from 'react-motion'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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

    console.log(this.props.router)

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
