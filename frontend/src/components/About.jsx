import Section from './Section.jsx'
import profile from '../data/profile.js'

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="A bit about me">
      <div className="about-grid">
        <p className="lead">{profile.summary}</p>
        <ul className="about-facts">
          <li>
            <span>Location</span>
            <strong>{profile.location}</strong>
          </li>
          <li>
            <span>Email</span>
            <strong>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </strong>
          </li>
          <li>
            <span>GitHub</span>
            <strong>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                @{profile.githubUsername}
              </a>
            </strong>
          </li>
          <li>
            <span>LinkedIn</span>
            <strong>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                View profile
              </a>
            </strong>
          </li>
        </ul>
      </div>
    </Section>
  )
}
