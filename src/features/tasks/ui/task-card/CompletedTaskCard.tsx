"use client"
import { useRef, useState } from 'react'
import { useTasksStore } from '@/features/tasks/store/tasks'
import ButtonOptions from './ButtonOptions'
import ModalOptions from './ModalOptions'
import ButtonWithIcon from './ButtonWithIcon'
import { DeleteIcon, RestoreIcon } from '@/shared/ui/icons'
import { Task } from '../../types'
interface CompletedTaskCardProps {
    id: Task['id'],
    title: Task['title'],
    description: Task['description'],
}
const CompletedTaskCard: React.FC<CompletedTaskCardProps> = ({ id, title, description }) => {
    const [showOptions, setShowOptions] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const deleteTask = useTasksStore(state => state.deleteTask);
    const toggleCompleteTask = useTasksStore(state => state.toggleCompleteTask);

    return (
    <div className="w-full bg-[#0000001a] rounded-md pt-1 px-1.5 pb-2.5">
        <div className="flex justify-between items-center">
            <h5 className="text-xl text-text w-fit max-w-[90%] break-words">{title}</h5>
            <div className="relative">
                <ButtonOptions 
                    onClick={() => setShowOptions(c => !c)} 
                    ref={buttonRef}
                />
                {showOptions && (
                    <ModalOptions 
                        onClose={() => setShowOptions(c => false)} 
                        triggerRef={buttonRef}
                    >
                        <ButtonWithIcon 
                            onClick={() => toggleCompleteTask(id)}
                            label="restore"
                            icon={RestoreIcon}
                        />
                        <ButtonWithIcon 
                            onClick={() => deleteTask(id)}
                            label="delete"
                            icon={DeleteIcon}
                        />
                    </ModalOptions>
                )}
            </div>
        </div>
        {description && <p className="mt-1.5 bg-secondary rounded-lg p-2 break-words">{description}</p>}
    </div>
  )
}

export default CompletedTaskCard