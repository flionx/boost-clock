interface InputNumberSettingsProps {
    value: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const InputNumberSettings: React.FC<InputNumberSettingsProps> = ({
    value,
    onChange
}) => {
  return (
    <input 
        type="number" 
        className="w-15 h-8 bg-[#b7b9d8] text-[#1c1c1c] text-center rounded-md"
        value={value}
        onChange={onChange}
    />
  )
}

export default InputNumberSettings