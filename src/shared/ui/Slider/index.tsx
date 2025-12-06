import React from 'react'
interface SliderProps {
    value: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const Slider: React.FC<SliderProps> = ({ value, onChange }) => {
  return (
    <label className="relative inline-block w-15 h-8 cursor-pointer">
        <input 
            type="checkbox" 
            className="size-0 opacity-0 peer" 
            checked={value} 
            onChange={onChange}
        />
        <span className="absolute inset-0 rounded-4xl bg-[#ccc] transition-colors duration-400 peer-checked:bg-[#65558f]" />
        <span className="absolute size-6 left-1 bottom-1 bg-white transition-transform duration-400 rounded-full peer-checked:translate-x-7" />
    </label>
  )
}

export default Slider