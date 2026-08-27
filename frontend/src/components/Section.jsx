import Reveal from './Reveal.jsx'

export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <Reveal as="header" className="section-head">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2>{title}</h2>
        </Reveal>
        <Reveal delay={120}>{children}</Reveal>
      </div>
    </section>
  )
}
