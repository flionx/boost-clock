import { FC } from "react";

interface Props {
  href: string,
  children: JSX.Element,
}

const ExternalLink: FC<Props> = ({href, children}) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
    </a>
  )
}

export default ExternalLink;