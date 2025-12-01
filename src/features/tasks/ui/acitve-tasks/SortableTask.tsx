"use client"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { motion } from "framer-motion"
import { ActiveTaskCard } from "../task-card"

const SortableTask = ({ id, task }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id })

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
      transition={{ duration: 0.4 }}
      className="mb-7.5 w-full overflow-hidden"
    >
      <ActiveTaskCard task={task} dragHandleProps={{ ...attributes, ...listeners }} />
    </motion.div>
  )
}

export default SortableTask