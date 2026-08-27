import profile from '../data/profile.js'
import Reveal from './Reveal.jsx'
import TypedText from './TypedText.jsx'
import StatValue from './StatValue.jsx'

const ROLES = [
  'Full-Stack Engineer (React & Python)',
  'AI-Assisted Code Migration Specialist',
  'Graduate Engineer Trainee @ Sopra Steria',
  'GATE 2026 Qualified · 800+ DSA Problems',
]

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <Reveal className="hero-text">
          <p className="eyebrow">Hello, I'm</p>
          <h1 className="gradient-text">{profile.name}</h1>
          <p className="hero-title">
            <TypedText phrases={ROLES} />
          </p>
          <p className="hero-tagline">{profile.tagline}</p>

          <p className="availability">
            <span className="dot" aria-hidden="true" />
            {profile.openToWork}
          </p>

          <ul className="tag-list">
            {profile.topSkills.map((skill) => (
              <li key={skill} className="tag">
                {skill}
              </li>
            ))}
          </ul>

          <div className="hero-actions">
            <a className="btn primary" href="#projects">
              View my work
            </a>
            <a className="btn" href={profile.resumeUrl} download={profile.resumeFileName}>
              Download resume
            </a>
          </div>

          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
        </Reveal>

        <Reveal className="hero-media" delay={150}>
          <div className="portrait">
            <img
              src={profile.avatar}
              alt={profile.name}
              width="320"
              height="320"
              onError={(e) => {
                e.currentTarget.src = profile.avatarFallback
              }}
            />
          </div>
        </Reveal>
      </div>

      <div className="container">
        <ul className="stats">
          {profile.stats.map((stat, i) => (
            <Reveal as="li" key={stat.label} delay={i * 90}>
              <StatValue value={stat.value} />
              <span>{stat.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
