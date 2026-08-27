import Section from './Section.jsx'
import SpotlightCard from './SpotlightCard.jsx'
import profile from '../data/profile.js'

export default function Certifications() {
  return (
    <Section id="certifications" eyebrow="Certifications" title="Licenses & certifications">
      <div className="card-grid">
        {profile.certifications.map((cert) => (
          <SpotlightCard key={cert.name}>
            <h3>{cert.name}</h3>
            <p className="company">{cert.issuer}</p>
            <span className="period">Issued {cert.date}</span>
          </SpotlightCard>
        ))}
      </div>
      <p className="muted note">
        {profile.certificationsNote}{' '}
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          View on LinkedIn
        </a>
        .
      </p>
    </Section>
  )
}
