import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/shared/ui/icons";
import { AdditionalLink, SocialLink } from "../types";

export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/flionx",
    icon: GithubIcon
  },
  {
    href: "https://www.instagram.com/dn06sh",
    icon: InstagramIcon
  },
  {
    href: "https://www.linkedin.com/in/danila-shipilov",
    icon: LinkedinIcon
  },

]

export const additionalLinks: AdditionalLink[] = [
  {
    href: "/terms",
    label: "terms"
  },
  {
    href: "/info",
    label: "info"
  },
  {
    href: "/policy",
    label: "privacy"
  },
]