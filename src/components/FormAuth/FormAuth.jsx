import { useState } from 'react'
import './FormAuth.css'
import { auth, provider } from '../../firebase';
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const FormAuth = ({title, onHandleClick}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    function checkForm(e) {
        e.preventDefault();
    }

    function signInWithGoogle() {
        signInWithPopup(auth, provider)
            .then((result) => {
                const userId = result.user.uid;
                navigate('/')
            }).catch((error) => {
                console.log(error.code);
            });
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