import React from 'react'
import FormAuth from '../components/FormAuth/FormAuth'
import { Link } from 'react-router-dom'

const SignInPage = () => {
  return (
    <div className='container'>
        <div className="auth">
            <h1>BoostClock</h1>
            <h2>Login</h2>
            <FormAuth title={'Sign in'}/>
            <span>Do not have an account?</span>
            <Link to='/signup'>Create an account</Link>
        </div>
    </div>
  )
}

export default SignInPage;