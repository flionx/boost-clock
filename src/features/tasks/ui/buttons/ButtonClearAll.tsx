"use client"
import { useModalWarningStore } from "@/shared/store/modal-warning"
import { useTasksStore } from "@/shared/store/tasks";
import { DeleteIcon } from "@/shared/ui/icons"

const ButtonClearAll = () => {
  const setModal = useModalWarningStore(state => state.setModal);
  const deleteTasks = useTasksStore(state => state.deleteTasks);
  const handleShowModal = () => setModal('Are you sure you want to delete all tasks?', 'Delete', deleteTasks);
  
  return (
    <button 
      onClick={handleShowModal}
      className="flex items-center gap-1.5 group"
    >
        <span className="text-xl text-nowrap group-hover:text-line">Clear all</span>
        <DeleteIcon width={24} height={24} className="dark:fill-line" />
    </button>
  )
}

export default ButtonClearAll