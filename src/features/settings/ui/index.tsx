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
  const t = useTranslations()

  const switchLanguage = (newLocale: Language) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.refresh();
  };
  
  return (
    <>
      <SectionModalMenu title={t("timer")}>
        <RowModalMenu label={t("autoWork")}>
          <Slider value={switchToWork} onChange={() => setAutoSwitch("work", !switchToWork)} />
        </RowModalMenu>
        <RowModalMenu label={t("autoBreak")}>
          <Slider value={switchToBreak} onChange={() => setAutoSwitch("break", !switchToBreak)} />
        </RowModalMenu>
        <RowModalMenu label={t("longBreak")}>
          <InputNumberSettings
            value={longBreakDuration}
            onChange={e => setDuration("longBreak", parseNumberInput(e.target.value))}
          />
        </RowModalMenu>
        <RowModalMenu label={t("longBreakInterval")}>
          <InputNumberSettings
            value={longBreakInterval}
            onChange={e => setLongBreakInterval(parseNumberInput(e.target.value))}
          />
        </RowModalMenu>
      </SectionModalMenu>
      <SectionModalMenu title={t("sounds")}>
        <RowModalMenu label={t("soundOn")}>
          <Slider value={soundEnabled} onChange={setSoundEnabled} />
        </RowModalMenu>
        <RowModalMenu label={t("repeat")}>
          <InputNumberSettings
            value={soundCountRepeat}
            onChange={e => setSoundCountRepeat(parseNumberInput(e.target.value, 0))}
          />
        </RowModalMenu>
      </SectionModalMenu>
      <SectionModalMenu title={t("appearance")}>
        <RowModalMenu label={t("theme")}>
          <SelectOptions value={resolvedTheme!} onChange={setTheme}>
            <option value="dark">{t("dark")}</option>
            <option value="light">{t("light")}</option>
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