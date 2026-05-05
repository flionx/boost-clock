import React from 'react'
interface FormTitle {
  children: React.ReactNode
}
const FormTitle: React.FC<FormTitle> = ({ children }) => {
  return (
    <h4 className="text-calc-small">
      {children}
    </h4>
  )
}

export default FormTitle