import { useEffect, useState } from "react";
import { setColorTheme } from "../store/slices/settingSlice";
import { useDispatch } from "react-redux";

function useChangeTheme() {

    const dispatch = useDispatch();
    // 'light' или 'dark'
    const [theme, setTheme] = useState(userTheme);
    function userTheme() {
        const storage = localStorage.getItem("theme");
        return storage ? storage : 'light';
    }
    
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add("dark-theme");
        } else {
            document.documentElement.classList.remove("dark-theme");
        }
    }, [theme])

    function changeTheme() {
        const otherTheme = (theme === 'light') ? 'dark' : 'light';
        setTheme(cur => cur = otherTheme);
        localStorage.setItem("theme", otherTheme);
        dispatch(setColorTheme(otherTheme))
        
    }
    return {changeTheme}
}    
    
export default useChangeTheme;