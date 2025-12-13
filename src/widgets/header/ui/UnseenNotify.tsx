import React from 'react'
interface UnseenNotifyProps {
  count: number
}
const UnseenNotify: React.FC<UnseenNotifyProps> = ({count}) => {
  return (
    <span 
      className="
        absolute -right-2 -top-0.5 size-5 bg-white rounded-full font-primary text-black text-center 
        shadow-[1px_2px_2px_0_rgba(0,0,0,0.25),1px_2px_#D9DBFF,1px_2px_2px_0_rgba(0,0,0,0.25)] pointer-events-none
      "
    >
        {count}
    </span>

  )
}

export default UnseenNotify