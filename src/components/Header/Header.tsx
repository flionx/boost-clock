import { useNavigate } from 'react-router-dom';
import NewAchiev from './NewAchiev';
import BurgerMenu from './BurgerMenu';
import ButtonLogOut from '../ButtonLogOut/ButtonLogOut';
import ModalWarning from '../ModalWarning/ModalWarning';
import useChangeTheme from '../../hooks/useChangeTheme';
import useManageHeader from '../../hooks/manage/useManageHeader';
import './Header.css'

const Header = () => {
    const navigate = useNavigate();
    const {changeTheme} = useChangeTheme();
    
    const {showReport, showAchiev, showSettingsHandler, callSetHasModal, 
        setHasNoAccess, saveAndLogout, newAchievs, hasModal, hasNoAccess,} = useManageHeader()

    return (
        <>
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
                                    <span key={1}>
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
                            <ButtonLogOut setHasModal={() => callSetHasModal(true)}></ButtonLogOut>
                        </ul>
                    </nav>
                    <BurgerMenu 
                        showReport={showReport} 
                        showAchiev={showAchiev} 
                        showSettingsHandler={showSettingsHandler} 
                        newAchievs={newAchievs}
                        setHasModal={callSetHasModal}
                    />
                </div>
            </div>
        </header>

        {hasModal && !hasNoAccess &&(
            <ModalWarning 
            onClickFalse={() => callSetHasModal(false)}
            onClickTrue={saveAndLogout}
            text='Are you sure you want to log out?'
            btnTrueText='Log out'
            />
        )}
        {hasNoAccess && !hasModal && (
            <ModalWarning 
            title='No access'
            onClickFalse={() => setHasNoAccess(false)}
            onClickTrue={() => {
                setHasNoAccess(false)
                navigate('/login')}
            }
            text='Please Sign Up or Log In'
            btnTrueText='Log in'
            />
        )}
        </>
    )
}

export default Header;



