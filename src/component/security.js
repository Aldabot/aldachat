import React from 'react'
import {SectionHeader} from './sectionHeader'

export default function Privacy() {
  return (
    <section>
      <SectionHeader>Seguridad</SectionHeader>

      <h2>Cómo protege Alda tu información financiera</h2>
      <p>Alda utiliza el cifrado de datos para proteger el acceso a su información personal y financiera y protegerlo contra transacciones no autorizadas. Si sospecha que ha habido actividad no autorizada en su cuenta, contáctenos inmediatamente a support@aldabot.es. Estamos aquí para ayudarlo.</p>

      <h2>Cifrado y almacenamiento</h2>
      <p>Su información financiera está encriptada, almacenada y protegida en servidores seguros. En la web, [https] y una barra verde es su señal de que el cifrado está activo.</p>

      <h2>Protección de cuenta</h2>
      <p>Si has perdido su teléfono o sospechas que se está utilizando de forma no autorizada, puedes evitar que acceda a tu cuenta de Alda visitando la sección "Contraseñas y autorizaciones" en la configuración de su cuenta en línea. Una vez que se haya revocado el acceso desde un dispositivo, se cerrará la sesión de cualquier sesión de Alda activa que tenga.</p>

      <h2>Mantente seguro</h2>
      <p>Alda está diseñada para pagos entre amigos y personas que confían el uno en el otro. Evita pagos a personas que no conoces, especialmente si se trata de una venta de bienes y servicios (como entradas para eventos y artículos de Wallapop). Estos pagos son potencialmente de alto riesgo, y podría perder su dinero sin obtener lo que pagó. Alda no ofrece protección al comprador o vendedor. El uso comercial de Alda requiere una solicitud y autorización explícita. Para obtener más información, consulte la sección correspondiente de nuestro Acuerdo de usuario.</p>

      <h2>Soporte de seguridad</h2>
      <p>Estamos aquí para ayudar. Si tiene preguntas o inquietudes sobre la seguridad, contáctanos en <a href="mailto@hola@alda.bot">hola@alda.bot</a>. El dedicado equipo de ingenieros de soporte de Alda se compromete a brindarle la mejor experiencia posible. Hacemos nuestro mejor esfuerzo para responder a cualquier servicio al cliente o problemas de soporte técnico de manera rápida, eficiente y con cuidado.</p>

      <h2>Divulgación responsable</h2>
      <p>Si usted es un investigador de seguridad y desea informar una vulnerabilidad que ha encontrado, consulte el Programa de Bug Bounty de PayPal.</p>
    </section>
  )
}
