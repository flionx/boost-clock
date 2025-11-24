import React from 'react'
interface FormColProps {
    children: React.ReactNode,
    noMarginBottom?: boolean
}
const FormCol: React.FC<FormColProps> = ({
  children,
  noMarginBottom = false
}) => {
  return (
    <div className={`flex flex-col gap-y-2 pr-5.5 ${noMarginBottom ? "" : "mb-3.5"}`}>
        {children}
    </div>
  )
}

export default FormCol