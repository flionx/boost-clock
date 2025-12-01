import React from 'react'
import { SocialLink } from '../types'

const ExternalLink: React.FC<SocialLink> = ({ 
  href,
  icon: Icon
 }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
    >
        <Icon className='size-8.5 text-white' />
    </a>
  )
}

export default ExternalLink