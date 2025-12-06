"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useTasksStore } from "@/features/tasks/store/tasks";
import { Task } from "@/shared/types/tasks";
import TaskForm from "./TaskForm";

interface TaskFormProps {
    task?: Task,
    editId?: Task['id'] | null
}
const AnimatedTaskForm: React.FC<TaskFormProps> = ({task, editId}) => {
    const showForm = useTasksStore(state => state.showForm);
    const editTaskId = useTasksStore(state => state.editTaskId);

    if (editId == null && editTaskId != null) return null;

  return (
        <AnimatePresence initial={false}>
            {showForm && (
                <motion.div
                    key={`form-${editId || 'create'}`}
                    className={`w-full overflow-hidden ${editId ? 'mt-7.5' : 'mb-7.5'}`}
                    exit={{ opacity: 0, height: 0, marginBottom: 0, marginTop: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <TaskForm task={task} />
                </motion.div>
            )}
        </AnimatePresence>
    )  
}

export default AnimatedTaskForm