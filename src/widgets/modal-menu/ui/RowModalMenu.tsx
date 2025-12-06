import React from 'react'
interface RowModalMenuProps {
    label: string,
    children: React.ReactNode
}
const RowModalMenu: React.FC<RowModalMenuProps> = ({ label, children }) => {
  return (
    <div className="flex items-center justify-between not-last:mb-4.5 w-98/100">
        <p className="inline-block">{label}</p>
        {children}
    </div>
  )
}

export default RowModalMenu