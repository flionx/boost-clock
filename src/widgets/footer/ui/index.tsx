import Link from 'next/link'
import ExternalLink from './ExternalLink'
import { additionalLinks, socialLinks } from '../constants'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="w-full pt-10 pb-7.5 bg-third">
      <div className="main-wrapper flex flex-col items-center">
        <div className="flex flex-col items-center mb-5">
          <h5 className='text-xl mb-4 text-content'>{t("contactMe")}:</h5>
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
              {t(link.label)}
            </Link>
          )}
        </nav>
        <p className="text-base tracking-[.5px] text-third-content mb-2.5">{t("developedBy")}</p>
        <p className="text-sm text-third-content">© 2026 Boost Clock</p>
      </div>
    </footer>
  )
}

export default Footer