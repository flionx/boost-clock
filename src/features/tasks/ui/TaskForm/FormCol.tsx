import React from 'react'
interface FormColProps {
    children: React.ReactNode
}
const FormCol: React.FC<FormColProps> = ({children}) => {
  return (
    <div className="flex flex-col gap-y-2 pr-5.5 mb-3.5 last:mb-0">
        {children}
    </div>
  )
}

export default FormCol