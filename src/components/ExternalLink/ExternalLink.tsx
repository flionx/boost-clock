import { FC } from "react";

type ExternalLinkProps = {
  href: string,
  children: JSX.Element,
}

const ExternalLink: FC<ExternalLinkProps> = ({href, children}) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
    </a>
  )
}

export default ExternalLink;