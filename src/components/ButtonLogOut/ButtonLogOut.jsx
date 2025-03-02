import React from 'react'
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch, useStore } from 'react-redux';
import { resetAchievs } from '../../store/slices/achievementSlice';
import { resetMainTask } from '../../store/slices/mainTaskSlice';
import { resetReport } from '../../store/slices/reportSlice';
import { resetSettings } from '../../store/slices/settingSlice';
import { resetTasks } from '../../store/slices/tasksSlice';
import getFilteredState from '../../hooks/getFilteredState';

const ButtonLogOut = () => {
    const dispatch = useDispatch();

    const store = useStore();
    
    const saveAndLogout = async () => {
        const user = auth.currentUser;        
        if (!user) return;

        try {            
            const dataState = getFilteredState(store.getState());   

            const userRef = doc(db, "Users", user.uid);
            await setDoc(userRef, dataState, { merge: true });
            console.log("Данные перед выходом сохранены");
            resetStateToDefault(dispatch);
            await auth.signOut();
            console.log("Пользователь вышел");
        } catch (error) {
            console.error("Ошибка при сохранении данных перед выходом:", error);
        }
    };

  return (
    <button onClick={saveAndLogout}>Log out</button>
  )
}

export default ButtonLogOut;

function resetStateToDefault(dispatch) {
  dispatch(resetAchievs());
  dispatch(resetMainTask());
  dispatch(resetReport());
  dispatch(resetSettings());
  dispatch(resetTasks());
  console.log('Состояние сброшено по умолчанию');
  
}