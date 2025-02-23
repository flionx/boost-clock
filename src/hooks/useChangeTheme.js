import { useEffect, useState } from "react";

function useChangeTheme() {
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
    }
    return {changeTheme}
}    
    
export default useChangeTheme;