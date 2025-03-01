import React, { useState } from 'react'
import './FormAuth.css'

const FormAuth = ({title}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function checkForm(e) {
        e.preventDefault();
        console.log(email, password);
    }

  return (
    <form onSubmit={checkForm} className='auth__form'>
        <label htmlFor="email">EMAIL</label>
        <input 
            type="email" id="email" placeholder='example@gmail.com'
            value={email} onChange={e => setEmail(e.target.value)}/>

        <label htmlFor="password">PASSWORD</label>
        <input 
            type="password" id="password" value={password} 
            onChange={e => setPassword(e.target.value)}/>
        <button className='auth__button' type='submit'>{title} with Email</button>
        <div className='auth__or'></div>
        <button className='auth__google'>{title} with Google</button>
    </form>
  )
}

export default FormAuth