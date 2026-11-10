import Link from "next/link";
import { additionalLinks, GITHUB_URL } from "../constants";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="w-full pt-10 pb-7.5 bg-third">
      <div className="main-wrapper flex flex-col items-center">
        <nav className="flex items-center gap-x-3 mb-3">
          {additionalLinks.map((link) => (
            <Link
              href={link.href}
              className="text-sm font-secondary hover:underline"
              key={link.label}
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>
        <p className="text-base tracking-[.5px] text-third-content mb-2.5">
          {t("developedBy")}{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {t("developer")}
          </a>
        </p>
        <p className="text-sm text-third-content">© 2026 Boost Clock</p>
      </div>
    </footer>
  );
};

export default Footer;
