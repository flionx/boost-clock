import { RowModalMenu, SectionModalMenu } from '@/widgets/modal-menu'
import RowReportValue from './RowReportValue'
import RowReportToday from './RowReportToday'

const Report = () => {
  return (
    <>
        <SectionModalMenu title="Today" lineUnderTitle={false}>
            <RowReportToday label="Work time" value="0h" />
            <RowReportToday label="Break time" value="0h" />
            <RowReportToday label="Completed tasks" value="0" />
        </SectionModalMenu>

        <SectionModalMenu title="Timer">
            <RowModalMenu label="Total work time">
                <RowReportValue value="0h"/>
            </RowModalMenu>
            <RowModalMenu label="Total break time">
                <RowReportValue value="0h"/>
            </RowModalMenu>
            <RowModalMenu label="Pomodoro rounds">
                <RowReportValue value="0"/>
            </RowModalMenu>
        </SectionModalMenu>
        
        <SectionModalMenu title="Tasks">
            <RowModalMenu label="Completed Tasks">
                <RowReportValue value="50"/>
            </RowModalMenu>
            <RowModalMenu label="On time">
                <RowReportValue value="47"/>
            </RowModalMenu>
            <RowModalMenu label="Out of time">
                <RowReportValue value="3"/>
            </RowModalMenu>
        </SectionModalMenu>
    </>
  )
}

export default Report