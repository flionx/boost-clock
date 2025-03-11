import { FC, useState } from 'react'
import './FormAuth.css'
import useAuthGoogle from '../../hooks/auth/useAuthGoogle';

interface Props {
    title: string,
    onHandleClick: (email: string, password: string) => void;
}

const FormAuth: FC<Props> = ({title, onHandleClick}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const authWithGoogle = useAuthGoogle();

  return (
    <form onSubmit={(e) =>e.preventDefault()} className='auth__form'>
        <label htmlFor="email">EMAIL</label>
        <input 
            type="email" id="email" 
            placeholder='example@gmail.com'
            value={email} onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">PASSWORD</label>
        <input 
            type="password" id="password" 
            placeholder='password'
            value={password} 
            onChange={e => setPassword(e.target.value)}
        />
        <button className='auth__button' type='submit'
            onClick={() => onHandleClick(email, password)}
        >{title} with Email</button>
        <div className='auth__or'></div>
        <button 
            className='auth__google'
            onClick={authWithGoogle}>{title} with Google</button>
    </form>
  )
}

export default FormAuth