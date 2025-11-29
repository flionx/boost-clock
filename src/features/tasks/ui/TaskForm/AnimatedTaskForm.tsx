"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useTasksStore } from "@/shared/store/tasks";
import { Task } from "@/shared/types/tasks";
import TaskForm from "./TaskForm";

interface TaskFormProps {
    task?: Task
}
const AnimatedTaskForm: React.FC<TaskFormProps> = ({task}) => {
    const showForm = useTasksStore(state => state.showForm);

  return (
        <AnimatePresence initial={false}>
            {showForm && (
                <motion.div
                    key="task-form"
                    className="w-full overflow-hidden mb-7.5"
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <TaskForm task={task} />
                </motion.div>
            )}
        </AnimatePresence>
  )  
}

export default AnimatedTaskForm