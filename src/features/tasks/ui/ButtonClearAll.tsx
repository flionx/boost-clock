"use client"

import { DeleteIcon } from "@/shared/ui/icons"

const ButtonClearAll = () => {
  return (
    <button className="flex items-center gap-1.5 group">
        <span className="text-xl text-nowrap group-hover:text-line">Clear all</span>
        <DeleteIcon width={24} height={24} className="dark:fill-line" />
    </button>
  )
}

export default ButtonClearAll