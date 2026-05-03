import RowReportValue from './RowReportValue'
interface RowReportTodayProps {
  label: string,
  value: string | number
}
const RowReportToday: React.FC<RowReportTodayProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between text-content-dark rounded-lg bg-surface-element not-last:mb-3 py-4 pr-7 pl-4">
      <p>{label}</p>
      <RowReportValue value={value} isToday />
    </div>
  )
}

export default RowReportToday