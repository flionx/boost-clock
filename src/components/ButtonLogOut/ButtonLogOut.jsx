import React, { useContext, useState } from 'react'
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch, useStore } from 'react-redux';
import { resetAchievs } from '../../store/slices/achievementSlice';
import { resetMainTask } from '../../store/slices/mainTaskSlice';
import { resetReport } from '../../store/slices/reportSlice';
import { resetSettings } from '../../store/slices/settingSlice';
import { resetTasks } from '../../store/slices/tasksSlice';
import getFilteredState from '../../hooks/getFilteredState';
import { UserContext } from '../UserProvider/UserProvider';
import { Link } from 'react-router-dom';
const itemClass = 'button__menu user-icon';

const ButtonLogOut = () => {
  const dispatch = useDispatch();
  const hasUser = useContext(UserContext);
  const store = useStore();
  
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
      }
  };

  return (
    <>
      {hasUser && <button className={itemClass} onClick={saveAndLogout}>Log out</button>}
      {!hasUser && <Link className={itemClass} style={{color: 'currentcolor'}} to='/login'>Log in</Link>}
    </>
  )
}

export default ButtonLogOut;

function resetStateToDefault(dispatch) {
  dispatch(resetAchievs());
  dispatch(resetMainTask());
  dispatch(resetReport());
  dispatch(resetSettings());
  dispatch(resetTasks());  
}