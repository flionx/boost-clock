import React from 'react'
import FormAuth from '../components/FormAuth/FormAuth'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom';
import useSaveUploadState from '../hooks/useSaveUploadState'
import { doc, getDoc } from 'firebase/firestore'


const SignInPage = () => {
    
    const navigate = useNavigate()
    const uploadUserData = useSaveUploadState();    

    const signInWithEmail = (email, password) => {
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const user = result.user;
                const dataRef = doc(db, "Users", user.uid);
                const userDoc = await getDoc(dataRef);

                if (userDoc.exists()) {
                    console.log('зашли в акк');
                    uploadUserData(userDoc.data())
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
            <h2>Login</h2>
            <FormAuth title={'Sign in'} onHandleClick={signInWithEmail}/>
            <span>Do not have an account?</span>
            <Link to='/signup'>Create an account</Link>
        </div>
    </div>
  )
}

export default SignInPage;