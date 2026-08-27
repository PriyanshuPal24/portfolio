import Section from './Section.jsx'
import SpotlightCard from './SpotlightCard.jsx'
import profile from '../data/profile.js'

const allSkills = profile.skills.flatMap((group) => group.items)

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with">
      <div className="card-grid">
        {profile.skills.map((group) => (
          <SpotlightCard key={group.category}>
            <h3>{group.category}</h3>
            <ul className="tag-list">
              {group.items.map((item) => (
                <li key={item} className="tag">
                  {item}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        ))}
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span key={`${skill}-${i}`} className="tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}
