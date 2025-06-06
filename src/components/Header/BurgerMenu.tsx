import { FC, useState } from "react";
import ButtonLogOut from "../ButtonLogOut/ButtonLogOut";
import NewAchiev from "./NewAchiev";
import './BurgerMenu.css'

interface Props {
    showReport: VoidFunction,
    showAchiev: VoidFunction,
    showSettingsHandler: VoidFunction,
    newAchievs: number,
    setHasModal: (value: boolean) => void,
}

const BurgerMenu: FC<Props> = ({showReport, showAchiev, showSettingsHandler, newAchievs, setHasModal}) => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    
    const toggleShowMenu = () => {
        setIsOpenMenu(prev => !prev)
    }

    return (
        <nav className="header__burger-menu">
            <button 
                onClick={toggleShowMenu}
                className={`burger-menu__icon ${isOpenMenu ? 'burger-menu__icon-rotate' : ''}`}>
                <span className="burger-menu-span"></span>
                <span key={2}>
                    {newAchievs > 0 && (<NewAchiev newAchievs={newAchievs}/>)}
                </span>
            </button>
            {isOpenMenu && <div onClick={toggleShowMenu} className="bg__burger-menu"></div>}
            <ul 
            className={`header__burger-list ${isOpenMenu ? 'header__burger-list-show': ''}`}>
                <li className="header__item">
                    <ButtonLogOut setHasModal={() => setHasModal(true)}/>
                </li>
                <li className="header__item item__menu">
                    <button 
                    onClick={showReport} 
                    className="button__menu btn--icon1">Report</button>
                </li>
                <li className="header__item item__menu ">
                    <button 
                    onClick={showAchiev} 
                    className="button__menu btn--icon2 ">
                        <span key={3}>
                            {newAchievs > 0 && (<NewAchiev newAchievs={newAchievs}/>)}
                        </span>
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