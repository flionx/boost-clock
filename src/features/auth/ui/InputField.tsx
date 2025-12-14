import React from 'react'
interface InputFieldProps {
    type: React.HTMLInputTypeAttribute,
    id: string,
    label: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const InputField: React.FC<InputFieldProps> = ({
    type, 
    id,
    label,
    placeholder,
    value,
    onChange
}) => {
  return (
    <>
        <label htmlFor={id} className="inline-block mb-1 text-[#2e2e2e]">{label}</label>
        <input 
            type={type} 
            id={id} 
            placeholder={placeholder}
            className="py-2.5 px-2 bg-[#ededed] rounded-md mb-4 w-full"
            value={value} 
            onChange={onChange}
            required
            minLength={type === "password" ? 6 : undefined}
        />
    </>
  )
}

export default InputField