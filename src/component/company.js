import React, { Component, Fragment } from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import { SectionHeader } from './sectionHeader'
import Logo from '../media/Alda_Circle_Logo_410.png'

const Section = styled.section`
  @media (min-width: 768px) {
    margin-top: 40px;
  }
`
const Image = styled.img`
  width: 100%;
`
const MyCol = styled(Col)`
  margin-bottom: 20px;
`
const CompanyHeader = styled.h2`
  font-size: 2rem;
`
const CompanyText = styled.p`
  font-size: 1.1rem;
`

class Company extends Component {
  render() {
    return (
      <Fragment>
        <Section>
          <Row type="flex" align="middle" justify="space-between" gutter={2}>
            <MyCol span={24} order={1} md={{span: 9, order: 2}}>
              <Image src={Logo} alt="Logo of Alda"/>
            </MyCol>
            <MyCol span={24} order={2} md={{span: 12, order: 1}}>
              <CompanyHeader>Nuestra Historia</CompanyHeader>
              <CompanyText>
                Nacida a principios de 2017 en un evento con el patrocinio de Banco Santander Innoventures primero y con el de Imagine Bank despues, Alda actualmente ayuda a más de 5,000 usuarios a tener una mejor relación con su dinero, todos los días.
              </CompanyText>
              <CompanyText>
                En Alda, siempre damos la bienvenida a solicitudes de empleo de personas excepcionales que desean expandir las fronteras de la inteligencia artificial y de las finanzas.
              </CompanyText>
            </MyCol>
          </Row>
        </Section>

        <SectionHeader>Nuestro Equipo</SectionHeader>
      </Fragment>
    )
  }
}

export default Company
