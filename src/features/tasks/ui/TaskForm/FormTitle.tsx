import React from 'react'
interface FormTitle {
    children: React.ReactNode
}
const FormTitle: React.FC<FormTitle> = ({children}) => {
  return (
    <h4 className="text-[calc(20px+(25-20)*((100vw-375px)/(1440-375)))]">
        {children}
    </h4>
  )
}

export default FormTitle