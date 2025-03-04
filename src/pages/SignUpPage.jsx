import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'
import { useStore } from 'react-redux';
import getFilteredState from '../hooks/getFilteredState';
import FormAuth from '../components/FormAuth/FormAuth'
import useChangeTheme from '../hooks/useChangeTheme';

const SignUpPage = () => {
    const navigate = useNavigate();
    const store = useStore();
    useChangeTheme();

    const signUpWithEmail = (email, password) => {
        if (!email || !password) return;

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const dataState = getFilteredState(store.getState())
                const user = result.user;
                const dataRef = doc(db, "Users", user.uid);
                await setDoc(dataRef, dataState, { merge: true });
                navigate('/')
            })
            .catch((error) => {
                console.log(error.code);
            })
    }

  return (
    <>
        <Link to='/' className='btn-arrow-home'></Link>
        <div className='container'>
            <div className="auth">
                <h1>BoostClock</h1>
                <h2>Create an account</h2>
                <FormAuth title={'Sign up'} onHandleClick={signUpWithEmail} />
                <span>Already have an account?</span>
                <Link to='/login'>Log in</Link>
            </div>
        </div>
    </>
  )
}

export default SignUpPage