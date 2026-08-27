import { useState } from 'react'
import Section from './Section.jsx'
import SpotlightCard from './SpotlightCard.jsx'
import profile from '../data/profile.js'

const API_BASE = import.meta.env.VITE_API_BASE ?? '/api'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value })

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus({ state: 'sending', message: '' })

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setForm(EMPTY)
      setStatus({ state: 'success', message: 'Thanks! Your message has been sent.' })
    } catch (error) {
      setStatus({ state: 'error', message: error.message })
    }
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Let's talk">
      <div className="contact-grid">
        <div>
          <p className="lead">
            Open to software engineering roles and interesting collaborations. Drop a message and
            I'll get back to you.
          </p>
          <ul className="about-facts">
            <li>
              <span>Email</span>
              <strong>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </strong>
            </li>
            <li>
              <span>LinkedIn</span>
              <strong>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  /in/priyanshu-pal
                </a>
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
          </ul>
        </div>

        <SpotlightCard as="form" className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={form.name}
              onChange={update('name')}
              required
              maxLength={80}
              autoComplete="name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={update('email')}
              required
              maxLength={120}
              autoComplete="email"
            />
          </label>
          <label>
            Subject
            <input type="text" value={form.subject} onChange={update('subject')} maxLength={120} />
          </label>
          <label>
            Message
            <textarea
              rows={5}
              value={form.message}
              onChange={update('message')}
              required
              maxLength={2000}
            />
          </label>

          <button type="submit" className="btn primary" disabled={status.state === 'sending'}>
            {status.state === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status.message && (
            <p className={status.state === 'error' ? 'form-msg error' : 'form-msg success'}>
              {status.message}
            </p>
          )}
        </SpotlightCard>
      </div>
    </Section>
  )
}
