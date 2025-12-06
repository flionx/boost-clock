"use client"
import { useState } from "react";
import { RowModalMenu, SectionModalMenu } from "@/widgets/modal-menu";
import Slider from "@/shared/ui/Slider"

const Settings = () => {
    const [switchToWork, setSwitchToWork] = useState(false);
    const [switchToBreak, setSwitchToBreak] = useState(false);
  return (
    <>
        <SectionModalMenu title="Timer">
            <RowModalMenu label="Auto switching to work">
                <Slider value={switchToWork} onChange={e => setSwitchToWork(e.target.checked)}/>
            </RowModalMenu>
            <RowModalMenu label="Auto switching to break">
                <Slider value={switchToBreak} onChange={e => setSwitchToBreak(e.target.checked)}/>
            </RowModalMenu>
            <RowModalMenu label="Long break">
                {/*  */}
            </RowModalMenu>
            <RowModalMenu label="Long Break interval">
                {/*  */}
            </RowModalMenu>
        </SectionModalMenu>
    </>
  )
}

export default Settings