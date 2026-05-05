import React from 'react'
interface RowReportValueProps {
  value: string | number,
  isToday?: boolean
}
const RowReportValue: React.FC<RowReportValueProps> = ({
  value,
  isToday = false
}) => {
  return (
    <p className={`
        ${isToday ? "bg-action-secondary-light rounded-md" : "bg-action-secondary rounded-lg"}
        py-0.5 px-3.5
      `}
    >
      {value}
    </p>
  )
}

export default RowReportValue