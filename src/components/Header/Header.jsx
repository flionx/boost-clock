import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { resetSettings, setShowSettings } from '../../store/slices/settingSlice';
import { resetReport, setShowReport } from '../../store/slices/reportSlice';
import { resetAchievs, setNewAchievs, setShowAchiev } from '../../store/slices/achievementSlice';
import useMelody from '../../hooks/useMelody';
import NewAchiev from './NewAchiev';
import BurgerMenu from './BurgerMenu';
import useChangeTheme from '../../hooks/useChangeTheme';
import ButtonLogOut from '../ButtonLogOut/ButtonLogOut';
import ModalWarning from '../ModalWarning/ModalWarning';
import getFilteredState from '../../hooks/getFilteredState';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { resetMainTask } from '../../store/slices/mainTaskSlice';
import { resetTasks } from '../../store/slices/tasksSlice';
import './Header.css'

function Header() {

    const [hasModal, setHasModal] = useState(false);
    const callSetHasModal = useCallback((value) => setHasModal(value), []);
    const dispatch = useDispatch();
    const store = useStore();

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
    
    const {changeTheme} = useChangeTheme();

    function showSettingsHandler() {
        dispatch(setShowSettings(true))
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

    const saveAndLogout = async () => {
        const user = auth.currentUser;        
        if (!user) return;
  
        try {            
            const dataState = getFilteredState(store.getState());   
            const userRef = doc(db, "Users", user.uid);
            await setDoc(userRef, dataState, { merge: true });
            resetStateToDefault(dispatch);
            await auth.signOut();
        } catch (error) {
            console.error("Ошибка при сохранении данных перед выходом:", error);
        } finally {
          setHasModal(false)
        }
    };

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
                                <ButtonLogOut setHasModal={callSetHasModal}><li></li></ButtonLogOut>
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

            {hasModal && (
                <ModalWarning 
                onClickFalse={() => callSetHasModal(false)}
                onClickTrue={saveAndLogout}
                text={'Are you sure you want to log out?'}
                btnTrueText={'Log out'}
                />
        )}
        </>
    )
}

export default Header;

function resetStateToDefault(dispatch) {
    dispatch(resetAchievs());
    dispatch(resetMainTask());
    dispatch(resetReport());
    dispatch(resetSettings());
    dispatch(resetTasks());  
  }


