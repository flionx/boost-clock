"use client"

import { useState, useLayoutEffect, useRef } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { motion } from "framer-motion"
import ActiveTaskCard from "../task-card/ActiveTaskCard"

const SortableTask = ({ id, task }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)

  useLayoutEffect(() => {
    if (ref.current && !isDragging) {
      setHeight(ref.current.getBoundingClientRect().height)
    }
  }, [isDragging])

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.25 }}
      className="mb-7.5 w-full overflow-hidden"
    >
      {isDragging ? (
        <div style={{ height }} />
      ) : (
        <div ref={ref}>
          <ActiveTaskCard 
            task={task} 
            dragHandleProps={{ ...attributes, ...listeners }} 
          />
        </div>
      )}
    </motion.div>
  )
}

export default SortableTask
