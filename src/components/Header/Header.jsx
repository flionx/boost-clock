import { useState, useEffect } from 'react';
import './Header.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setShowSettings } from '../../store/slices/settingSlice';

function Header() {

    const dispatch = useDispatch();
    const showSettings = useSelector(state => state.settings.showSettings)

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

    function showSettingsHandler() {
        dispatch(setShowSettings(true))
    }


    function changeTheme() {
        const otherTheme = (theme === 'light') ? 'dark' : 'light';
        setTheme(cur => cur = otherTheme);
        localStorage.setItem("theme", otherTheme);
    }

    return (
        <header className="header">
            <div className="container header__content">
                <h1 className="header__logo">BoostClock</h1>
                <ul className="header__right">
                    <li className="header__item">
                        <button 
                        onClick={changeTheme}
                        className="header__theme btn-ui"></button>
                    </li>

                    <li className="header__item">
                        <button 
                        onClick={showSettingsHandler}
                        className="header__settings button__menu">Settings</button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;