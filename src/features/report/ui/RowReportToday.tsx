import RowReportValue from './RowReportValue'
interface RowReportTodayProps {
    label: string,
    value: string | number
}
const RowReportToday: React.FC<RowReportTodayProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between text-[#1c1c1c] rounded-lg bg-modal-menu not-last:mb-3 py-4 pr-7 pl-4">
        <p>{label}</p>
        <RowReportValue value={value} isToday />
    </div>
  )
}

export default RowReportToday