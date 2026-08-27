import Section from './Section.jsx'
import profile from '../data/profile.js'

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <ol className="timeline">
        {profile.experience.map((job) => (
          <li key={`${job.company}-${job.role}`}>
            <div className="timeline-head">
              <h3>{job.role}</h3>
              <span className="period">{job.period}</span>
            </div>
            <p className="company">
              {job.company}
              {job.employmentType && <span className="muted"> · {job.employmentType}</span>}
            </p>
            {job.location && <p className="period">{job.location}</p>}
            <p>{job.description}</p>
            {job.highlights?.length > 0 && (
              <ul className="bullets">
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            {job.skills?.length > 0 && (
              <ul className="tag-list">
                {job.skills.map((skill) => (
                  <li key={skill} className="tag">
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </Section>
  )
}
