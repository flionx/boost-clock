import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import useSaveUploadState from '../hooks/useSaveUploadState'
import FormAuth from '../components/FormAuth/FormAuth'
import { useDispatch, useSelector } from 'react-redux'
import { setWaitModal } from '../store/slices/settingSlice'
import WaitModal from '../components/WaitModal/WaitModal'
import { useState } from 'react'
import useChangeTheme from '../hooks/useChangeTheme'

const SignInPage = () => {
    const [canGoHome, setCanGoHome] = useState(true);

    useChangeTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {uploadUserData} = useSaveUploadState(); //данные из дб в состояние

    const {hasWait} = useSelector(state => state.settings.waitModal);

    const signInWithEmail = (email, password) => {
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                
                const uid = result.user.uid;
                const dataRef = doc(db, "Users", uid);
                dispatch(setWaitModal({status: 'green', hasWait: true, message: 'Please wait... Loading data'}))
                setCanGoHome(curr => false);
                const userDoc = await getDoc(dataRef);

                if (userDoc.exists()) {
                    
                    const userData = userDoc.data() || {};  
                    uploadUserData({
                        achievement: userData.achievement || [],
                        mainTask: userData.mainTask || {},
                        report: userData.report || {},
                        settings: userData.settings || {},
                        tasks: userData.tasks || [],
                    });
                    
                }
                dispatch(setWaitModal({status: '', hasWait: false, message: ''}))
                navigate('/')
            })
            .catch((error) => {
                dispatch(setWaitModal({status: 'red', hasWait: true, message: 'incorrect email or password'}))
            }).finally(() => {
                setCanGoHome(curr => true);
            })
    }

  return (
    <>
        <Link to={canGoHome ? '/' : ''} className='btn-arrow-home'></Link>
        <div className='container'>
            <div className="auth">
                <h1>BoostClock</h1>
                <h2>Login</h2>
                <FormAuth title={'Sign in'} onHandleClick={signInWithEmail}/>
                <span>Do not have an account?</span>
                <Link to='/signup'>Create an account</Link>
            </div>
        </div>
        {hasWait && <WaitModal />}
    </>

  )
}

export default SignInPage;