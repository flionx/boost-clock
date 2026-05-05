"use client"
import { useModalStore } from "@/shared/store/modal"
import { useTasksStore } from "@/features/tasks/store/tasks";
import { DeleteIcon } from "@/shared/ui/icons"
import { useTranslations } from "next-intl";

const ButtonClearAll = () => {
  const setModal = useModalStore(state => state.setModal);
  const deleteTasks = useTasksStore(state => state.deleteTasks);
  const t = useTranslations();
  const handleShowModal = () => setModal(t("warning"), t("sureToDelete"), t("delete"), deleteTasks);

  return (
    <button
      onClick={handleShowModal}
      className="flex items-center gap-1.5 group"
    >
      <span className="text-xl text-nowrap group-hover:text-line">{t("clearAll")}</span>
      <DeleteIcon width={24} height={24} className="dark:fill-line" />
    </button>
  )
}

export default ButtonClearAll