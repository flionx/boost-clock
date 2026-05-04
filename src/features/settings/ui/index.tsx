"use client"
import { useTheme } from "next-themes";
import { useTimerSettingsStore } from "@/features/timer/store/timer-settings";
import { RowModalMenu, SectionModalMenu } from "@/widgets/modal-menu";
import { parseNumberInput } from "@/shared/lib/parseNumberInput";
import InputNumberSettings from "./InputNumberSettings";
import Slider from "@/shared/ui/Slider"
import SelectOptions from "./SelectOptions";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Language } from "@/shared/i18n/types";

const Settings = () => {
  const switchToWork = useTimerSettingsStore(state => state.autoSwitchTo.work);
  const switchToBreak = useTimerSettingsStore(state => state.autoSwitchTo.break);
  const setAutoSwitch = useTimerSettingsStore(state => state.setAutoSwitch);
  const longBreakDuration = useTimerSettingsStore(state => state.longBreakDuration);
  const longBreakInterval = useTimerSettingsStore(state => state.longBreakInterval);
  const setDuration = useTimerSettingsStore(state => state.setDuration);
  const setLongBreakInterval = useTimerSettingsStore(state => state.setLongBreakInterval);
  const soundEnabled = useTimerSettingsStore(state => state.soundEnabled);
  const setSoundEnabled = useTimerSettingsStore(state => state.setSoundEnabled);
  const soundCountRepeat = useTimerSettingsStore(state => state.soundCountRepeat);
  const setSoundCountRepeat = useTimerSettingsStore(state => state.setSoundCountRepeat);
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("settings")

  const switchLanguage = (newLocale: Language) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.refresh();
  };
  return (
    <>
      <SectionModalMenu title="Timer">
        <RowModalMenu label="Auto switching to work">
          <Slider value={switchToWork} onChange={() => setAutoSwitch("work", !switchToWork)} />
        </RowModalMenu>
        <RowModalMenu label="Auto switching to break">
          <Slider value={switchToBreak} onChange={() => setAutoSwitch("break", !switchToBreak)} />
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
          <Slider value={soundEnabled} onChange={setSoundEnabled} />
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
          <SelectOptions value={resolvedTheme!} onChange={setTheme}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </SelectOptions>
        </RowModalMenu>
        <RowModalMenu label={t("lang")}>
          <SelectOptions value={locale as Language} onChange={switchLanguage}>
            <option value="en">{t("en")}</option>
            <option value="ru">{t("ru")}</option>
          </SelectOptions>
        </RowModalMenu>
      </SectionModalMenu>
    </>
  )
}

export default Settings