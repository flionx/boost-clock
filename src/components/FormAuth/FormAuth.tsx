import { FC, FormEventHandler, MouseEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useStore } from 'react-redux';
import { useAppDispatch } from '../../hooks/useRedux';
import { AppStore, RootState } from '../../store/store';
import { setWaitModal } from '../../store/slices/settingSlice';
import getFilteredState from '../../hooks/getFilteredState';
import useSaveUploadState from '../../hooks/useSaveUploadState';
import './FormAuth.css'
import { IUploadData } from '../../types/global';

interface Props {
    title: string,
    onHandleClick: (email: string, password: string) => void;
}

const FormAuth: FC<Props> = ({title, onHandleClick}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {uploadUserData} = useSaveUploadState();
    const store = useStore<AppStore>();
    
    const checkForm: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    }

    const signInWithGoogle: MouseEventHandler<HTMLButtonElement> = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const userId = result.user.uid;

                const dataRef = doc(db, "Users", userId);
                const userDoc = await getDoc(dataRef);

                if (userDoc.exists()) {
                    uploadUserData(userDoc.data() as IUploadData)
                }
                else {
                    const dataState = getFilteredState(store.getState() as unknown as RootState);
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