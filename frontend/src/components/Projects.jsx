import { useEffect, useMemo, useState } from 'react'
import Section from './Section.jsx'
import SpotlightCard from './SpotlightCard.jsx'
import profile from '../data/profile.js'
import { API_BASE } from '../api.js'

function sortRepos(repos) {
  const featured = profile.featuredRepos
  return [...repos].sort((a, b) => {
    const ai = featured.indexOf(a.name)
    const bi = featured.indexOf(b.name)
    if (ai !== bi) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
    return new Date(b.pushed_at) - new Date(a.pushed_at)
  })
}

async function loadRepos() {
  try {
    const res = await fetch(`${API_BASE}/github/repos`)
    if (!res.ok) throw new Error('backend unavailable')
    return await res.json()
  } catch {
    // Fall back to GitHub's public API so the site still works without the backend.
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUsername}/repos?per_page=100&sort=updated`,
    )
    if (!res.ok) throw new Error('Unable to load repositories from GitHub.')
    const data = await res.json()
    return data.map((repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      topics: repo.topics ?? [],
      pushed_at: repo.pushed_at,
      fork: repo.fork,
    }))
  }
}

export default function Projects() {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('loading')
  const [showAll, setShowAll] = useState(false)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    let cancelled = false
    loadRepos()
      .then((data) => {
        if (cancelled) return
        const visible = data.filter(
          (repo) => !repo.fork && !profile.hiddenRepos.includes(repo.name),
        )
        setRepos(sortRepos(visible))
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const languages = useMemo(
    () => ['All', ...new Set(repos.map((repo) => repo.language).filter(Boolean))],
    [repos],
  )

  const filtered = useMemo(
    () => (filter === 'All' ? repos : repos.filter((repo) => repo.language === filter)),
    [repos, filter],
  )

  const visibleRepos = showAll ? filtered : filtered.slice(0, 6)

  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built">
      {status === 'loading' && (
        <div className="skeleton-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="skeleton" />
          ))}
        </div>
      )}

      {status === 'error' && (
        <p className="muted">
          Could not load projects right now.{' '}
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            Browse them on GitHub
          </a>
          .
        </p>
      )}

      {status === 'ready' && (
        <>
          <div className="filters">
            {languages.map((language) => (
              <button
                key={language}
                type="button"
                className={filter === language ? 'chip active' : 'chip'}
                onClick={() => {
                  setFilter(language)
                  setShowAll(false)
                }}
              >
                {language}
                {language !== 'All' && (
                  <> · {repos.filter((repo) => repo.language === language).length}</>
                )}
              </button>
            ))}
          </div>

          <div className="card-grid">
            {visibleRepos.map((repo) => (
              <SpotlightCard key={repo.name} className="project">
                <div className="project-head">
                  <h3>{repo.name.replace(/[-_]/g, ' ')}</h3>
                  {profile.featuredRepos.includes(repo.name) && (
                    <span className="badge">Featured</span>
                  )}
                </div>
                <p>{repo.description || 'No description provided yet.'}</p>
                <div className="project-meta">
                  {repo.language && <span className="tag">{repo.language}</span>}
                  <span className="muted">★ {repo.stargazers_count}</span>
                  <span className="muted">⑂ {repo.forks_count}</span>
                  <span className="muted">
                    Updated {new Date(repo.pushed_at).toLocaleDateString('en-GB', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="project-links">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    Source code
                  </a>
                  {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                      Live demo
                    </a>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>

          {filtered.length > 6 && (
            <div className="center">
              <button type="button" className="btn" onClick={() => setShowAll((v) => !v)}>
                {showAll ? 'Show fewer projects' : `Show all ${filtered.length} projects`}
              </button>
            </div>
          )}
        </>
      )}
    </Section>
  )
}
