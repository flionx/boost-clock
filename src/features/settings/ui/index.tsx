"use client"
import { useState } from "react";
import { useTimerSettingsStore }  from "@/features/timer/store/timer-settings";
import { RowModalMenu, SectionModalMenu } from "@/widgets/modal-menu";
import { parseNumberInput } from "@/shared/lib/parseNumberInput";
import InputNumberSettings from "./InputNumberSettings";
import Slider from "@/shared/ui/Slider"
import SelectOptions from "./SelectOptions";
import { useThemeStore } from "@/features/theme-toggle/store/theme";

const Settings = () => {
    const [switchToWork, setSwitchToWork] = useState(false);
    const [switchToBreak, setSwitchToBreak] = useState(false);
    const longBreakDuration = useTimerSettingsStore(state => state.longBreakDuration);
    const longBreakInterval = useTimerSettingsStore(state => state.longBreakInterval);
    const setDuration = useTimerSettingsStore(state => state.setDuration);
    const setLongBreakInterval = useTimerSettingsStore(state => state.setLongBreakInterval);
    const soundEnabled = useTimerSettingsStore(state => state.soundEnabled);
    const setSoundEnabled = useTimerSettingsStore(state => state.setSoundEnabled);
    const soundCountRepeat = useTimerSettingsStore(state => state.soundCountRepeat);
    const setSoundCountRepeat = useTimerSettingsStore(state => state.setSoundCountRepeat);
    const theme = useThemeStore(state => state.theme);
    const setTheme = useThemeStore(state => state.setTheme);
  return (
    <>
        <SectionModalMenu title="Timer">
            <RowModalMenu label="Auto switching to work">
                <Slider value={switchToWork} onChange={setSwitchToWork}/>
            </RowModalMenu>
            <RowModalMenu label="Auto switching to break">
                <Slider value={switchToBreak} onChange={setSwitchToBreak}/>
            </RowModalMenu>
            <RowModalMenu label="Long break">
                <InputNumberSettings 
                    value={longBreakDuration} 
                    onChange={e => setDuration("longBreak", parseNumberInput(e.target.value))}
                />
            </RowModalMenu>
            <RowModalMenu label="Long Break interval">
                <InputNumberSettings 
                    value={longBreakInterval} 
                    onChange={e => setLongBreakInterval(parseNumberInput(e.target.value))}
                />
            </RowModalMenu>
        </SectionModalMenu>
        <SectionModalMenu title="Sounds">
            <RowModalMenu label="Sound on">
                <Slider value={soundEnabled} onChange={setSoundEnabled}/>
            </RowModalMenu>
            <RowModalMenu label="Repeat ">
                <InputNumberSettings 
                    value={soundCountRepeat} 
                    onChange={e => setSoundCountRepeat(parseNumberInput(e.target.value, 0))}
                />
            </RowModalMenu>
        </SectionModalMenu>
        <SectionModalMenu title="Theme">
            <RowModalMenu label="Color">
                <SelectOptions value={theme} onChange={setTheme} />
            </RowModalMenu>
        </SectionModalMenu>
    </>
  )
}

export default Settings