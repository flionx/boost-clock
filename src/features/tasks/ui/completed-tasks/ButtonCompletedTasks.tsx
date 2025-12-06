"use client"
import { useTasksStore } from "@/features/tasks/store/tasks";
import { ArrowDownIcon } from "@/shared/ui/icons"
import { AnimatePresence, motion } from "framer-motion";
import useCompletedTasks from "../../model/useCompletedTasks";

const ButtonCompletedTasks = () => {
  const tasks = useCompletedTasks();
  const showCompletedTasks = useTasksStore(state => state.showCompletedTasks);
  const toggleShowCompletedTasks = useTasksStore(state => state.toggleShowCompletedTasks);
  
  return (
    <AnimatePresence>
      {tasks.length > 0 && (
        <motion.button
          key="completed-button"
          onClick={toggleShowCompletedTasks}
          initial={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          transition={{ 
            duration: 0.3,
            delay: 0.3
          }}
          className="w-full flex justify-between items-center py-1.5 px-12 text-3xl bg-accent rounded-lg mb-1.5 overflow-hidden"
        >
          Completed Tasks
          <ArrowDownIcon className={`
              size-7 text-text dark:text-line relative left-3 duration-300
              transition-transform ${showCompletedTasks ? 'rotate-0' : 'rotate-180'} 
            `} 
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ButtonCompletedTasks