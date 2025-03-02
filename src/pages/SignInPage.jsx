import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import useSaveUploadState from '../hooks/useSaveUploadState'
import FormAuth from '../components/FormAuth/FormAuth'

const SignInPage = () => {
    const navigate = useNavigate();
    const {uploadUserData} = useSaveUploadState(); //данные из дб в состояние

    const signInWithEmail = (email, password) => {
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                
                const uid = result.user.uid;
                const dataRef = doc(db, "Users", uid);
                const userDoc = await getDoc(dataRef);
                console.log(userDoc);

                if (userDoc.exists()) {
                    
                    const userData = userDoc.data() || {};  
                    uploadUserData({
                        achievement: userData.achievement || [],
                        mainTask: userData.mainTask || {},
                        report: userData.report || {},
                        settings: userData.settings || {},
                        tasks: userData.tasks || [],
                    });
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