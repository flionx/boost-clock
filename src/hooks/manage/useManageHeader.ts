import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/UserProvider/UserProvider";
import { useAppDispatch, useAppSelector, useAppStore } from "../useRedux";
import { resetSettings, setShowSettings } from "../../store/slices/settingSlice";
import { resetReport, setShowReport } from "../../store/slices/reportSlice";
import { resetAchievs, setNewAchievs, setShowAchiev } from "../../store/slices/achievementSlice";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { resetMainTask } from "../../store/slices/mainTaskSlice";
import { resetTasks } from "../../store/slices/tasksSlice";
import getFilteredState from "../../utils/getFilteredState";
import { melodyNotification } from "../../utils/getMelody";

const useManageHeader = () => {
    const [hasModal, setHasModal] = useState(false);
    const [hasNoAccess, setHasNoAccess] = useState(false)
    const callSetHasModal = useCallback((value: boolean) => setHasModal(value), []);
    const hasUser = useContext(UserContext);

    const dispatch = useAppDispatch();
    const store = useAppStore();
    const newAchievs = useAppSelector(state => state.achievement.newAchievs);
    const {soundOn} = useAppSelector(state => state.settings.mainSettings); 


    useEffect(()=> {
        if (newAchievs > 0 && soundOn) {
            setTimeout(()=> {
                melodyNotification.currentTime = 0;
                melodyNotification.play();
            }, 2000)
          }
    }, [newAchievs])
    
    function showSettingsHandler() {
        dispatch(setShowSettings(true))
    }

    function showReport() {
        if (hasUser) {
            dispatch(setShowReport(true));
        } else {
            setHasNoAccess(true)
        }
    }
    function showAchiev() {
        if (hasUser) {
            dispatch(setShowAchiev(true));
            if (newAchievs > 0) {
                dispatch(setNewAchievs('reset'));
            }
        } else {
            setHasNoAccess(true)
        }
    }

    const saveAndLogout = async () => {
        const user = auth.currentUser;        
        if (!user) return;
  
        try {            
            const dataState = getFilteredState(store.getState());   
            const userRef = doc(db, "Users", user.uid);
            await setDoc(userRef, dataState, { merge: true });
            resetStateToDefault();
            await auth.signOut();
        } catch (error) {
            console.error("Ошибка при сохранении данных перед выходом:", error);
        } finally {
          setHasModal(false)
        }
    };

    function resetStateToDefault() {
        dispatch(resetAchievs());
        dispatch(resetMainTask());
        dispatch(resetReport());
        dispatch(resetSettings());
        dispatch(resetTasks());  
      }

    return {showReport, showAchiev, showSettingsHandler, newAchievs, hasModal, 
    callSetHasModal, hasNoAccess, setHasNoAccess, saveAndLogout}

}

export default useManageHeader