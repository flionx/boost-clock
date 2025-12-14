import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/shared/ui/icons";
import { SocialLink } from "../types";

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

export const additionalLinks = [
    {
        href: "/terms",
        label: "Terms of Use"
    },
    {
        href: "/info",
        label: "Info"
    },
    {
        href: "/policy",
        label: "Privacy Policy"
    },
]