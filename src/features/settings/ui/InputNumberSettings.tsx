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
      className="w-15 h-8 bg-action-secondary-light text-content-dark text-center rounded-md"
      value={value}
      onChange={onChange}
    />
  )
}

export default InputNumberSettings