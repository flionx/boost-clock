import { useState } from 'react'
import useSaveUploadState from '../../hooks/useSaveUploadState';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useDispatch, useStore } from 'react-redux';
import './FormAuth.css'
import getFilteredState from '../../hooks/getFilteredState';
import { setWaitModal } from '../../store/slices/settingSlice';

const FormAuth = ({title, onHandleClick}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {uploadUserData} = useSaveUploadState();
    const store = useStore();
    
    function checkForm(e) {
        e.preventDefault();
    }

    function signInWithGoogle() {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const userId = result.user.uid;

                const dataRef = doc(db, "Users", userId);
                const userDoc = await getDoc(dataRef);

                if (userDoc.exists()) {
                    uploadUserData(userDoc.data())
                }
                else {
                    const dataState = getFilteredState(store.getState());
                    await setDoc(dataRef, dataState, { merge: true });
                }
                navigate('/');

            }).catch((error) => {
                console.log(error.code);
                dispatch(setWaitModal({status: 'red', hasWait: true, message: 'Something went wrong'}))
                
            })
    }

  return (
    <form onSubmit={checkForm} className='auth__form'>
        <label htmlFor="email">EMAIL</label>
        <input 
            type="email" id="email" 
            placeholder='example@gmail.com'
            value={email} onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="password">PASSWORD</label>
        <input 
            type="password" id="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
        />
        <button className='auth__button' type='submit'
            onClick={() => onHandleClick(email, password)}
        >{title} with Email</button>
        <div className='auth__or'></div>
        <button 
            className='auth__google'
            onClick={signInWithGoogle}>{title} with Google</button>
    </form>
  )
}

export default FormAuth