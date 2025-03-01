import React, { useRef } from 'react'
import FormAuth from '../components/FormAuth/FormAuth'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'

const SignUpPage = () => {
    const navigate = useNavigate();
    const userRef = useRef(null);
    if (!userRef.current) {
        userRef.current = useSelector(state => state);
        console.log('часто');
        
    }
    const userData = userRef.current;

    const signUpWithEmail = (email, password) => {
        if (!email || !password) return;

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const user = result.user;
                if (userData) {
                    const userRef = doc(db, "Users", user.uid)
                    await setDoc(userRef, userData)
                }
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
            <h2>Create an account</h2>
            <FormAuth title={'Sign up'} onHandleClick={signUpWithEmail}/>
            <span>Already have an account?</span>
            <Link to='/login'>Log in</Link>
        </div>

    </div>
  )
}

export default SignUpPage