import { useTranslations } from 'next-intl'
import ButtonClearAll from '../buttons/ButtonClearAll'

const TasksHeader = () => {
  const t = useTranslations();
  return (
    <div className="flex justify-between items-center pr-2.5 pb-2.5 pl-12.5 border-b-2 border-line mb-8.5">
      <h3 className="text-3xl">{t("tasks")}</h3>
      <ButtonClearAll />
    </div>
  )
}

export default TasksHeader