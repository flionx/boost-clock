import { FC, ReactNode } from "react";

interface Props {
  href: string,
  children: ReactNode,
}

const ExternalLink: FC<Props> = ({href, children}) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
    </a>
  )
}

export default ExternalLink;