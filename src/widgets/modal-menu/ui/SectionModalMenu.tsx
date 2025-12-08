import React from 'react'
interface SectionModalMenuProps {
    title: string,
    children: React.ReactNode,
    lineUnderTitle?: boolean
}
const SectionModalMenu: React.FC<SectionModalMenuProps> = ({ 
  title, 
  children, 
  lineUnderTitle = true 
}) => {
  return (
    <section>
        <h4 className="text-lg tracking-wider mt-6 mb-1.5">{title}</h4>
        {lineUnderTitle && <hr className="w-full h-[1px] mb-3 text-line" />}
        {children}
    </section>
  )
}

export default SectionModalMenu