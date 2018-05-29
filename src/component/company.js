import React, { Component, Fragment } from 'react'
import { Row, Col, Card, Divider } from 'antd'
import styled from 'styled-components'
import { SectionHeader } from './sectionHeader'
import Logo from '../media/Alda_Circle_Logo_410.png'
import Gabriel from '../media/gabriel.jpeg'
import Dirk from '../media/dirk.jpeg'
import Toni from '../media/toni.jpeg'

const { Meta } = Card

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

const TeamCol = styled(Col)`
  margin-bottom: 16px;
`
const TeamCard = styled(Card)`
  height: 100%;
`
const TeamUl = styled.ul`
  list-style-image: linear-gradient(45deg,#FFB3AA,#FFD0AA);
  padding: 10px;
`

class Company extends Component {
  render() {
    return (
      <Fragment>
        <Section>
          <Row type="flex" align="middle" justify="space-between" gutter={2}>
            <MyCol span={24} md={{span: 12}}>
              <CompanyHeader>Nuestra Historia</CompanyHeader>
              <CompanyText>
                Nacida a principios de 2017 en un evento con el patrocinio de Banco Santander Innoventures primero y con el de Imagine Bank despues, Alda actualmente ayuda a más de 5,000 usuarios a tener una mejor relación con su dinero, todos los días.
              </CompanyText>
              <CompanyText>
                En Alda, siempre damos la bienvenida a solicitudes de empleo de personas excepcionales que desean expandir las fronteras de la inteligencia artificial y de las finanzas.
              </CompanyText>
            </MyCol>
            <MyCol span={24} md={{span: 9}}>
              <Image src={Logo} alt="Logo of Alda"/>
            </MyCol>
          </Row>
        </Section>

        <Section>
          <SectionHeader>Nuestro Equipo</SectionHeader>
          <Row type="flex" gutter={16}>
            <TeamCol span={24} md={{span: 8}} >
              <TeamCard
                hoverable
                cover={<img src={Gabriel} alt="Gabriel Rosiñol" />}
              >
                <Meta
                  title="Gabriel Rosiñol"
                  description="Co-founder & CEO"
                />
                <Divider />
                <TeamUl>
                  <li>3 años de consultor de estrategia en banca</li>
                  <li>Anterioramente analista de riesgos en Wonga</li>
                  <li>Ingeniero industrial (Cum Laude, IQS)</li>
                </TeamUl>
              </TeamCard>
            </TeamCol>
            <TeamCol span={24} md={{span: 8}}>
              <TeamCard
                hoverable
                cover={<img src={Dirk} alt="Dirk Hornung" />}
              >
                <Meta
                  title="Dirk Hornung"
                  description="Co-founder & CEO"
                />
                <Divider />
                <TeamUl>
                  <li>6 años de desarollo full-stack</li>
                  <li>Experto en redes neuronales</li>
                  <li>Doctorando en fisica teorica (UAB)</li>
                </TeamUl>
              </TeamCard>
            </TeamCol>
            <TeamCol span={24} md={{span: 8}}>
              <TeamCard
                hoverable
                cover={<img src={Toni} alt="Toni Rosiñol" />}
              >
                <Meta
                  title="Toni Rosiñol"
                  description="CIO"
                />
                <Divider />
                <TeamUl>
                  <li>Experto en inteligencia artificial</li>
                  <li>Doctorando en visión computacional (MIT)</li>
                </TeamUl>
              </TeamCard>
            </TeamCol>
          </Row>
        </Section>
      </Fragment>
    )
  }
}

export default Company
