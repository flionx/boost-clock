import { ChangeEventHandler } from 'react';
import { resetSettings, setAutoToRelax, setAutoToWork, setLongBreak, 
setLongBreakInterval, setRepeatSound, setShowSettings, setSoundOn } from '../../store/slices/settingSlice';
import useChangeTheme from '../useChangeTheme';
import { useAppDispatch } from '../useRedux';

const useManageSettings = () => {
    const dispatch = useAppDispatch();
    const {changeTheme} = useChangeTheme();

    function hideSettings() {
        dispatch(setShowSettings(false));
    }
    const onChangeAutoToRelax = () => {
        dispatch(setAutoToRelax())
    }
    const onChangeAutoToWork = () => {
        dispatch(setAutoToWork())
    }
    const onChangeBreak: ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch(setLongBreak(Number(e.target.value)))
    }
    const onChangeBreakInterval: ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch(setLongBreakInterval(Number(e.target.value)))
    }
    const onChangeSoundOn = () => {
        dispatch(setSoundOn())
    }
    const onChangeRepeatSound: ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch(setRepeatSound(Number(e.target.value)))
    }
    const onChangeColorTheme = () => {
        changeTheme();
    }
    function resetSettingsHandle() {
        dispatch(resetSettings())
    }

    return {hideSettings, onChangeAutoToRelax, onChangeAutoToWork, onChangeBreak, onChangeBreakInterval, 
        onChangeSoundOn, onChangeRepeatSound, onChangeColorTheme, resetSettingsHandle}
}

export default useManageSettings