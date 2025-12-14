"use client"
import { useState } from "react"
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useTasksStore } from "@/features/tasks/store/tasks"
import { AnimatePresence } from "framer-motion"
import SortableTask from "./SortableTask"
import ActiveTaskCard from "../task-card/ActiveTaskCard"
import useActiveTasks from "../../model/useActiveTasks"

const ActiveTaskList = () => {
  const tasks = useActiveTasks()
  const reorder = useTasksStore(s => s.reorderTasks)

  const [activeId, setActiveId] = useState<string | null>(null)
  const activeTask = tasks.find(t => t.id === activeId)

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={({ active }) => {
        setActiveId(active.id as string)
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          reorder(active.id as string, over.id as string)
        }
        setActiveId(null)
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext
        items={tasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <AnimatePresence>
          {tasks.map(task => (
            <SortableTask key={task.id} id={task.id} task={task} />
          ))}
        </AnimatePresence>
      </SortableContext>

      <DragOverlay dropAnimation={null}>
        {activeTask ? (
          <ActiveTaskCard task={activeTask} dragHandleProps={null} />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default ActiveTaskList
