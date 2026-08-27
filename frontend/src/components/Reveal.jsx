import { useReveal } from '../hooks/useInteractions.js'

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const { ref, className: revealClass, style } = useReveal(delay)

  return (
    <Tag ref={ref} className={`${revealClass} ${className}`.trim()} style={style} {...rest}>
      {children}
    </Tag>
  )
}
