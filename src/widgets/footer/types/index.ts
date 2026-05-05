export interface SocialLink {
  href: string,
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export type AdditionalLinkLabel = "terms" | "info" | "privacy";
export interface AdditionalLink {
  href: string,
  label: AdditionalLinkLabel
}