import Link from 'next/link'
import ExternalLink from './ExternalLink'
import { additionalLinks, socialLinks } from '../constants'

const Footer = () => {
  return (
    <footer className="w-full pt-10 pb-7.5 bg-third">
      <div className="main-wrapper flex flex-col items-center">
        <div className="flex flex-col items-center mb-5">
          <h5 className='text-xl mb-4 text-content'>Contact me:</h5>
          <nav className="flex gap-x-6 items-center">
            {socialLinks.map(link =>
              <ExternalLink key={link.href} href={link.href} icon={link.icon} />
            )}
          </nav>
        </div>
        <nav className="flex gap-x-3 mb-4">
          {additionalLinks.map(link =>
            <Link
              href={link.href}
              className="text-sm font-secondary hover:underline"
              key={link.label}
            >
              {link.label}
            </Link>
          )}
        </nav>
        <p className="text-base tracking-[.5px] text-third-content mb-2.5">Developed with ♥ by Flionx.</p>
        <p className="text-sm text-third-content">© 2025 Boost Clock</p>
      </div>
    </footer>
  )
}

export default Footer