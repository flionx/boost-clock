import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import useSaveUploadState from '../hooks/useSaveUploadState'
import FormAuth from '../components/FormAuth/FormAuth'
import setWaitModal from '../store/slices/settingSlice'

const SignInPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uploadUserData = useSaveUploadState(); //данные из дб в состояние

    const signInWithEmail = (email, password) => {
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const user = result.user;
                const dataRef = doc(db, "Users", user.uid);
                const userDoc = await getDoc(dataRef);

                if (userDoc.exists()) {
                    dispatch(setWaitModal({
                        status: 'orange',
                        hasWait: true,
                        message: 'Please wait...',
                      }))
                    uploadUserData(userDoc.data())
                }
                dispatch(setWaitModal({
                    status: 'green',
                    hasWait: true,
                    message: 'User authorized',
                  }))
                navigate('/')
            })
            .catch((error) => {
                console.log(error.code);
            });
    }

  return (
    <div className='container'>
        <div className="auth">
            <h1>BoostClock</h1>
            <h2>Login</h2>
            <FormAuth title={'Sign in'} onHandleClick={signInWithEmail}/>
            <span>Do not have an account?</span>
            <Link to='/signup'>Create an account</Link>
        </div>
    </div>
  )
}

export default SignInPage;