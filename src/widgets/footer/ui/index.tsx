import { additionalLinks, socialLinks } from '../constants'
import ExternalLink from './ExternalLink'

const Footer = () => {
  return (
    <footer className="w-full pt-10 pb-7.5 bg-footer-bg">
        <div className="flex flex-col items-center w-[clamp(22rem,58.3vw,70rem)] mx-auto">
            <div className="flex flex-col items-center mb-5">
                <h5 className='text-xl mb-4 text-text'>Contact me:</h5>
                <nav className="flex gap-x-6 items-center">
                    {socialLinks.map(link => 
                        <ExternalLink href={link.href} icon={link.icon}/>
                    )}
                </nav>
            </div>
            <nav className="flex gap-x-3 mb-4">
                {/* todo: change to link */}
                {additionalLinks.map(link => 
                    <span className="text-sm font-secondary">{link.label}</span>
                )}
            </nav>
            <p className="text-base tracking-[.5px] text-footer mb-2.5">Developed with ♥ by Flionx.</p>
            <p className="text-sm text-footer">© 2025 Boost Clock</p>
        </div>
    </footer>
  )
}

export default Footer