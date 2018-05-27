import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'
import { Transition } from 'react-spring'
import styled from 'styled-components'
import phone from '../media/phone.png'
import video from '../media/300-loan.mp4'
import diamond from '../media/diamond.svg'

const MySection = styled.section`
  margin-bottom: 40px;
`

const Phone = styled.img`
  width: 100%;
  z-index: 1;
`

const Video = styled.video`
  position: absolute;
  top: 13%;
  left: 14%;
  width: 75%;
`

const RightCol = styled(Col)`
  text-align: center;
  padding-bottom: 30px;
  color: white;
  h1 {
    color: white;
  }
  @media (min-width: 768px) {
    color: black;
    text-align: left;
    text-align: center;
    padding-bottom: 30px;
    h1 {
      color: black;
    }
  }
`

const Diamond = styled.img`
  position: absolute;
  top: -40vw;
  left: -60vw;
  width: 175vw;
  z-index: -1;
  @media (min-width: 768px) {
    width: 100vw;
    top: -70vw;
  }
`
const Diamond2 = Diamond.extend`
  top: 33vw;
  left: auto;
  right: -36vw;
  width: 60vw;
`

class IntroVideo extends Component {
    render() {
        return (
          <MySection>
            <Transition from={{ opacity: 0, left: '-80vw' }} enter={{ opacity: 1, left: '-60vw' }} config={{friction: 50}}>
              { styles => <Diamond style={styles} src={diamond} /> }
            </Transition>
            <Col xs={0}>
              <Transition from={{ opacity: 0, right: '-80vw' }} enter={{ opacity: 1, right: '-36vw' }} config={{friction: 40}}>
                { styles => <Diamond2 src={diamond} style={styles} /> }
              </Transition>
            </Col>
            <Row type="flex" justify="center" align="middle">
              <Transition from={{ top: -100 }} enter={{ top: 0 }} config={{friction: 50}}>
                { styles => (
                  <Col span={22} order={2} md={{ span: 8, order: 1}} style={styles}>
                    <Phone src={phone} alt="movil" />
                    <Video autoPlay>
                      <source src={video} type="video/mp4"/>
                    </Video>
                  </Col>
                )}
              </Transition>
              <Transition from={{ top: 100 }} enter={{ top: 0 }} config={{friction: 50}}>
                { styles => (
                  <RightCol span={22} order={1} md={{span: 8, order: 2}} style={styles}>
                    <h1>Alda</h1>
                    <p>Disfruta de tu propio asesor financiero y mejora ya tu situación financiera.</p>
                    <p>Regístrate gratis con solo un clic.</p>
                    <a href="#try"><Button>Hablar con Alda!</Button></a>
                  </RightCol>
                )}
              </Transition>
            </Row>
          </MySection>
        )
    }
}

export default IntroVideo;
