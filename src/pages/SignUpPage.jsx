import React from 'react'
import FormAuth from '../components/FormAuth/FormAuth'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <div className='container'>
        <div className="auth">
            <h1>BoostClock</h1>
            <h2>Create an account</h2>
            <FormAuth title={'Sign up'}/>
            <span>Already have an account?</span>
            <Link to='/login'>Log in</Link>
        </div>

    </div>
  )
}

export default SignUpPage