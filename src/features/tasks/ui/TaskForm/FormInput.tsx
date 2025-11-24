import React from 'react'
interface FormInputProps {
    type: "text" | "textarea" | "number"
}
const FormInput: React.FC<FormInputProps> = ({
    type
}) => {
  return (
    <>
        {type === "text" ? 
            <input 
                className="bg-white text-[#1C1C1C] py-1.5 px-5 rounded-lg"
                type="text" 
                placeholder="title for your task" 
            />
        : type === "textarea" ?
            <textarea 
                className="bg-white text-[#1C1C1C] py-1.5 px-5 rounded-lg min-h-7.5"
                placeholder="more detailed task description"
            />
        :
            <input
                className="w-12.5 py-1.5 px-4 rounded-lg bg-white text-[#1C1C1C] appearance-none"
                type="number"
                defaultValue={0}
                // onChange={e => onChange(parseNumberInput(e.target.value))}
            />
        }
            
    </>
  )
}

export default FormInput