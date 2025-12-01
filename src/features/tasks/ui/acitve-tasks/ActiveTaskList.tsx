"use client"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useTasksStore } from "@/shared/store/tasks"
import { AnimatePresence } from "framer-motion"
import SortableTask from "./SortableTask"
import useActiveTasks from "../../model/useActiveTasks"

const ActiveTaskList = () => {
  const tasks = useActiveTasks();
  const reorder = useTasksStore(s => s.reorderTasks)

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          reorder(active.id as string, over.id as string)
        }
      }}
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
    </DndContext>
  )
}

export default ActiveTaskList
