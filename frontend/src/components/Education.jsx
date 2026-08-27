import Section from './Section.jsx'
import SpotlightCard from './SpotlightCard.jsx'
import profile from '../data/profile.js'

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic background">
      <div className="card-grid">
        {profile.education.map((item) => (
          <SpotlightCard key={item.degree}>
            <h3>{item.degree}</h3>
            <p className="company">{item.institution}</p>
            <span className="period">{item.period}</span>
            {item.grade && <p className="grade">{item.grade}</p>}
            <p>{item.description}</p>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  )
}
