import NewAchiev from "./NewAchiev";
import './BurgerMenu.css'
import { useState } from "react";

function BurgerMenu({showReport, showAchiev, showSettingsHandler, newAchievs}) {

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    function toggleShowMenu() {
        setIsOpenMenu(prev => !prev)
    }

    return (
        <nav className="header__burger-menu">
            <button 
                onClick={toggleShowMenu}
                className={`burger-menu__icon ${isOpenMenu ? 'burger-menu__icon-rotate' : ''}`}>
                <span></span>
                {newAchievs > 0 && (<NewAchiev newAchievs={newAchievs}/>)}
            </button>
            {isOpenMenu && (
                <div onClick={toggleShowMenu} className="bg__burger-menu"></div>
            )}
            <ul 
            className={`header__burger-list ${isOpenMenu ? 'header__burger-list-show': ''}`}>
                <li className="header__item item__menu">
                    <button 
                    onClick={showReport} 
                    className="button__menu btn--icon1">Report</button>
                </li>
                <li className="header__item item__menu ">
                    <button 
                    onClick={showAchiev} 
                    className="button__menu btn--icon2 ">
                        {newAchievs > 0 && (<NewAchiev newAchievs={newAchievs}/>)}
                        Achievements
                    </button>
                </li>
                <li className="header__item">
                    <button 
                    onClick={showSettingsHandler}
                    className="header__settings button__menu">Settings</button>
                </li>
            </ul>
        </nav>
    )
}

export default BurgerMenu;