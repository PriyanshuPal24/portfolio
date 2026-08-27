/** Adds a cursor-following spotlight to any card by tracking pointer position. */
export default function SpotlightCard({ as: Tag = 'article', className = '', children, ...rest }) {
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <Tag className={`card ${className}`.trim()} onMouseMove={handleMove} {...rest}>
      {children}
    </Tag>
  )
}
