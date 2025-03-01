import React from 'react'
import FormAuth from '../components/FormAuth/FormAuth'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';


const SignInPage = () => {

    const navigate = useNavigate();
    const signInWithEmail = (email, password) => {
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                console.log('uid:' + user.uid);
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