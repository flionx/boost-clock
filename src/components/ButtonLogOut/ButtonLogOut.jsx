import React from 'react'
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useStore } from 'react-redux';

const ButtonLogOut = () => {

    const store = useStore();
    
    const saveAndLogout = async () => {
        const user = auth.currentUser;
        console.log(user);
        
        if (!user) return;

        try {            
            const dataState = store.getState();   
            console.log(dataState);
                     
            console.log("Состояние сохранено:" + dataState);
            
            const userRef = doc(db, "Users", user.uid);
            await setDoc(userRef, dataState, { merge: true });

            console.log("Данные перед выходом сохранены");
            await auth.signOut();
            console.log("🚪 Пользователь вышел");
        } catch (error) {
            console.error("Ошибка при сохранении данных перед выходом:", error);
        }
    };

  return (
    <button onClick={saveAndLogout}>Log out</button>
  )
}

export default ButtonLogOut;