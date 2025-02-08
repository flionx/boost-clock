import { useState, useEffect } from 'react';
import './index.css'

function Header() {

    // значение 'light' или 'dark'
    const [theme, setTheme] = useState(userTheme);

    // если пользователь уже менял тему - при след.запуске применяем ее
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
                        <button className="header__settings button__menu">Settings</button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;