import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSettings } from '../../store/slices/settingSlice';
import { setShowReport } from '../../store/slices/reportSlice';
import { setNewAchievs, setShowAchiev } from '../../store/slices/achievementSlice';
import NewAchiev from './NewAchiev';
import BurgerMenu from './BurgerMenu';
import './Header.css'
import useMelody from '../../hooks/useMelody';

function Header() {

    const dispatch = useDispatch();
    const newAchievs = useSelector(state => state.achievement.newAchievs);

    const {soundOn} = useSelector(state => state.settings.mainSettings); 

    const {melodyNotification} = useMelody();

    useEffect(()=> {
        if (newAchievs > 0 && soundOn) {
            setTimeout(()=> {
                melodyNotification.currentTime = 0;
                melodyNotification.play();
            }, 2000)
          }
    }, [newAchievs])
    
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

    function showReport() {
        dispatch(setShowReport(true));
    }
    function showAchiev() {
        dispatch(setShowAchiev(true));
        if (newAchievs > 0) {
            dispatch(setNewAchievs('reset'));
        }
    }

    return (
        <header className="header">
            <div className="container header__content">
                <h1 className="header__logo">BoostClock</h1>
                <div className="header__right">
                    <button 
                    onClick={changeTheme}
                    className="header__theme btn-ui"></button>
                    
                    <nav className="header__menu">
                        <ul className="header__list">
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

                    <BurgerMenu 
                        showReport={showReport} 
                        showAchiev={showAchiev} 
                        showSettingsHandler={showSettingsHandler} 
                        newAchievs={newAchievs}/>
            
                </div>
            </div>
        </header>
    )
}

export default Header;