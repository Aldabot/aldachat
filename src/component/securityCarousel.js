import React, { Component } from 'react'
import { Row, Col, Carousel, Button, Icon } from 'antd'
import styled from 'styled-components'
import SaltedgeLogo from '../media/saltedge-logo.png'

const MySection = styled.section`
`
const SectionHeader = styled.h1`
  text-align: center;
  font-size: 40px;
  position: relative;
  padding: 20px;
  margin-bottom: 40px;
  &:after {
    content: "";
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 2px;
    position: absolute;
    background: linear-gradient(to right, #FFB3AA, #FFD0AA)
  }
`

const SlideContainer = styled.div`
  padding: 0 1vw 0 1vw;
  @media (min-width: 768px) {
    padding: 0 4vw 0 4vw;
  }
`

const SlideFrame = styled.div`
  background: linear-gradient(#00c6ff, #0072ff);
  padding: 6vw;
  @media (min-width: 768px) {
    padding: 2.5vw;
  }
`
const SlideContent = styled.div`
  padding: 3vw;
  background-color: white;
  height: 50vh;
  @media (min-width: 768px) {
  height: 70vh;
  }
`

const SlideRow = styled(Row)`
  margin-bottom: 20px;
  text-align: left !important;
`
const SlideIconCol = styled(Col)`
`
const SlideIdCol = styled(Col)`
  opacity: 0.1;
  color: #0072ff;
  text-align: right;
  margin-right: 10px;
  font-size: 50px;
  @media (min-width: 768px) {
    margin-right: 30px;
    font-size: 100px;
  }
`
const SlideIcon = styled(Icon)`
  margin: 10px;
  font-size: 50px;
  @media (min-width: 768px) {
    margin: 30px;
    font-size: 100px;
  }
`
const SlideImage = styled.img`
  max-height: 140px;
  max-width: 80%;
`
const SlideHeader = styled.h1`
  font-size: 20px;
  @media (min-width: 768px) {
    font-size: 40px;
  }
`
const SlideText = styled.p`
  font-size: 15px;
  @media (min-width: 768px) {
    font-size: 22px;
  }
`

class SecurtyCarousel extends Component {
  render() {
    const carouselSettings = {
      slidesToShow: 1,
      infinite: false,
      draggable: true,
      focusOnSelect: true,
      centerMode: true,
      centerPadding: "100px",
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: false,
          }
        }
      ]
    }

    return (
      <MySection>
        <SectionHeader>Seguridad de primera clase</SectionHeader>
        <Carousel {...carouselSettings}>
          <SlideContainer>
            <SlideFrame>
              <SlideContent>
                <SlideRow type="flex" justify="space-between">
                  <SlideIconCol span={12}>
                    <SlideIcon type="key" />
                  </SlideIconCol>
                  <SlideIdCol>1</SlideIdCol>
                </SlideRow>
                <SlideHeader>Máxima seguridad</SlideHeader>
                <SlideText>
                  La seguridad de Alda es la misma que la de tu banco y está validada por los mayores especialistas en seguridad digital. Además, la información está protegida con nivel de seguridad bancaria de 256 bits, que es el mismo nivel de protección que tienen los bancos más avanzados.
                </SlideText>
              </SlideContent>
            </SlideFrame>
          </SlideContainer>
          <SlideContainer>
            <SlideFrame>
              <SlideContent>
                <SlideRow type="flex" justify="space-between">
                  <SlideIconCol span={12}>
                    <SlideImage src={SaltedgeLogo} />
                  </SlideIconCol>
                  <SlideIdCol>2</SlideIdCol>
                </SlideRow>
                <SlideHeader>Solo claves de consulta</SlideHeader>
                <SlideText>
                  Para registrarte Alda solo te pide tu correo electrónico y tus claves de consulta (no las que utilizas para transacciones). Con las claves de lectura no se pueden realizar compras, transferencias ni demás operaciones bancarias.
                </SlideText>
              </SlideContent>
            </SlideFrame>
          </SlideContainer>
          <SlideContainer>
            <SlideFrame>
              <SlideContent>
                <SlideRow type="flex" justify="space-between">
                  <SlideIconCol span={12}>
                    <SlideIcon type="team" />
                  </SlideIconCol>
                  <SlideIdCol>3</SlideIdCol>
                </SlideRow>
                <SlideHeader>Estamos aquí para ayudar</SlideHeader>
                <SlideText>
                  Detrás de Alda existe un equipo que siempre está a tu disposición para ayudarte con cualquier duda o consulta que puedas tener. Tenemos un sistema de soporte al cliente que te permite contactarnos en cualquier momento a hola@alda.bot o llamando al 665 933 852.
                </SlideText>
              </SlideContent>
            </SlideFrame>
          </SlideContainer>
        </Carousel>
      </MySection>
    )
  }
}

export default SecurtyCarousel
