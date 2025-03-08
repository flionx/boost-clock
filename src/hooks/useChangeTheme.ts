import { useEffect } from "react";
import { setColorTheme } from '../store/slices/settingSlice';
import { useAppDispatch, useAppSelector } from "./useRedux";

function useChangeTheme() {
    const dispatch = useAppDispatch();
    const userSettingsTheme = useAppSelector(state => state.settings.mainSettings.colorTheme);
    
    useEffect(() => {
        if (userSettingsTheme === 'dark') {
            document.documentElement.classList.add("dark-theme");
        } else {
            document.documentElement.classList.remove("dark-theme");
        }
    }, [userSettingsTheme])

    function changeTheme() {
        const otherTheme = (userSettingsTheme === 'light') ? 'dark' : 'light';
        dispatch(setColorTheme(otherTheme))
    }
    return {changeTheme}
}    
    
export default useChangeTheme;