import React, { Component } from 'react'
import { Row, Col, Carousel, Button, Icon } from 'antd'
import styled from 'styled-components'
import SaltedgeLogo from '../media/saltedge-logo.png'

const MySection = styled.section`
`

const SlickSlide = styled.div`
  margin: 0 20px 0 10px;
  background: linear-gradient(#00c6ff, #0072ff);
  padding: 25px;
`
const Slide = styled.div`
  padding: 30px;
  background-color: white;
  width: 60vw;
  height: 500px;
`
const SlideRow = styled(Row)`
  margin-bottom: 20px;
  text-align: left !important;
`
const SlideIconCol = styled(Col)`
`
const SlideIdCol = styled(Col)`
  margin-right: 30px;
  color: #0072ff;
  opacity: 0.1;
  font-size: 100px;
  text-align: right;
`
const SlideIcon = styled(Icon)`
  margin: 30px;
  font-size: 100px;
`
const SlideImage = styled.img`
  margin: 10px;
  max-height: 140px;
`
const SlideHeader = styled.h1`
font-size: 40px;
`
const SlideContent = styled.p`
  font-size: 25px;
`

class SecurtyCarousel extends Component {
  render() {
    const carouselSettings = {
      className: "center",
      centerMode: true,
      infinite: false,
      centerPadding: "60px",
      slidesToShow: 1,
      variableWidth: true,
      speed: 500,
    }

    return (
      <MySection>
        <Row type="flex" justify="center">
          <Col span={24}>
            <Carousel {...carouselSettings} arrows={true}>
              <SlickSlide>
                <Slide>
                  <SlideRow type="flex" justify="space-between">
                    <SlideIconCol span={12}>
                      <SlideIcon type="key" />
                    </SlideIconCol>
                    <SlideIdCol>1</SlideIdCol>
                  </SlideRow>
                  <SlideHeader>Máxima seguridad</SlideHeader>
                  <SlideContent>
                    La seguridad de Alda es la misma que la de tu banco y está validada por los mayores especialistas en seguridad digital. Además, la información está protegida con nivel de seguridad bancaria de 256 bits, que es el mismo nivel de protección que tienen los bancos más avanzados.
                  </SlideContent>
                </Slide>
              </SlickSlide>
              <SlickSlide>
                <Slide>
                  <SlideRow type="flex" justify="space-between">
                    <SlideIconCol span={12}>
                      <SlideImage src={SaltedgeLogo} />
                    </SlideIconCol>
                    <SlideIdCol>2</SlideIdCol>
                  </SlideRow>
                  <SlideHeader>Solo claves de consulta</SlideHeader>
                  <SlideContent>
                    Para registrarte Alda solo te pide tu correo electrónico y tus claves de consulta (no las que utilizas para transacciones). Con las claves de lectura no se pueden realizar compras, transferencias ni demás operaciones bancarias.
                  </SlideContent>
                </Slide>
              </SlickSlide>
              <SlickSlide>
                <Slide>
                  <SlideRow type="flex" justify="space-between">
                    <SlideIconCol span={12}>
                      <SlideIcon type="team" />
                    </SlideIconCol>
                    <SlideIdCol>3</SlideIdCol>
                  </SlideRow>
                  <SlideHeader>Estamos aquí para ayudar</SlideHeader>
                  <SlideContent>
                    Detrás de Alda existe un equipo que siempre está a tu disposición para ayudarte con cualquier duda o consulta que puedas tener. Tenemos un sistema de soporte al cliente que te permite contactarnos en cualquier momento a hola@alda.bot o llamando al 665 933 852.
                  </SlideContent>
                </Slide>
              </SlickSlide>
            </Carousel>
          </Col>
        </Row>
      </MySection>
    )
  }
}

export default SecurtyCarousel
