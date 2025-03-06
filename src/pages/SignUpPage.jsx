import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import getFilteredState from '../hooks/getFilteredState';
import FormAuth from '../components/FormAuth/FormAuth';
import useChangeTheme from '../hooks/useChangeTheme';
import WaitModal from '../components/WaitModal/WaitModal';
import { setWaitModal } from '../store/slices/settingSlice';

const SignUpPage = () => {
    const navigate = useNavigate();
    const store = useStore();
    const dispatch = useDispatch();
    useChangeTheme();
    const { hasWait } = useSelector(state => state.settings.waitModal);

    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (auth.currentUser) {
                auth.currentUser.reload().then(() => {
                    if (auth.currentUser.emailVerified) {
                        clearInterval(intervalRef.current);
                        dispatch(setWaitModal({ status: '', hasWait: false, message: '' }));
                        navigate('/');
                    }
                });
            }
        }, 3000);

        return () => clearInterval(intervalRef.current);
    }, [dispatch, navigate]);

    function signUpWithEmail(email, password) {
        if (!email || !password) return;

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const user = result.user;
                const dataState = getFilteredState(store.getState());
                const dataRef = doc(db, 'Users', user.uid);
                dispatch(setWaitModal({ status: 'orange', hasWait: true, message: 'Please, wait...' }));
                await setDoc(dataRef, dataState, { merge: true });
                sendVerifEmail(user);
            })
            .catch((error) => {
                console.log(error.code);
                dispatch(setWaitModal({ status: 'red', hasWait: true, message: 'Something went wrong' }));

            });
    }

    function sendVerifEmail(user) {
        sendEmailVerification(user)
            .then(() => {
                dispatch(setWaitModal({ status: 'orange', hasWait: true, message: 'Email verification sent' }));
            })
            .catch((error) => {
                console.log(error);
                dispatch(setWaitModal({ status: 'red', hasWait: true, message: 'Something went wrong' }));
            });
    }

    return (
        <>
            <Link to="/" className="btn-arrow-home"></Link>
            <div className="container">
                <div className="auth">
                    <h1>BoostClock</h1>
                    <h2>Create an account</h2>
                    <FormAuth title={'Sign up'} onHandleClick={signUpWithEmail} />
                    <span>Already have an account?</span>
                    <Link to="/login">Log in</Link>
                </div>
            </div>
            {hasWait && <WaitModal />}
        </>
    );
};

export default SignUpPage;
