"use client"
import Slider from "@/shared/ui/Slider"
import { useState } from "react";

const Settings = () => {
    const [switchToWork, setSwitchToWork] = useState(false);
  return (
    <Slider value={switchToWork} onChange={e => setSwitchToWork(e.target.checked)}/>
  )
}

export default Settings