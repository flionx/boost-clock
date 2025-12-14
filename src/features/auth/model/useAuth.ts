"use client"
import { useEffect, useRef, useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, provider } from '@/shared/lib/firebase';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'next/navigation';
import { UserData } from '@/shared/types/user-data';
import getUserData from '@/shared/lib/getUserData';
import uploadUserData from '@/shared/lib/uploadUserData';
import toast from 'react-hot-toast';

const useAuth = () => {
    const [isEmailVerifySent, setIsEmailVerifySent] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();
    const setLoading = useAuthStore(state => state.setLoading)

    useEffect(() => {
        if (!isEmailVerifySent) return;
        
        intervalRef.current = setInterval(() => {
            if (auth.currentUser) {
                auth.currentUser.reload().then(() => {
                    if (auth.currentUser && auth.currentUser.emailVerified) {
                        if (intervalRef.current) clearInterval(intervalRef.current);

                        toast.dismissAll();
                        setLoading(false);
                        toast.success("Email has been verified");
                        router.push('/');
                    }
                });
            }
        }, 2000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }    
    }, [isEmailVerifySent]);

    function signUpWithEmail(email: string, password: string) {
        if (!email || !password) return;

        const toastId = toast.loading("Please, wait...");
        setLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const user = result.user;
                const dataRef = doc(db, 'Users', user.uid);
                const userData = getUserData();                
                await setDoc(dataRef, userData, { merge: true });
                toast.dismiss(toastId);
                sendVerifEmail(user);
            })
            .catch((error) => {
                toastAndLogError(error, "Something went wrong");
                setLoading(false);
            });
        }
        
        function sendVerifEmail(user: User) {
            sendEmailVerification(user)
            .then(() => {
                toast.loading("Email verification sent");
                setIsEmailVerifySent(true);
            })
            .catch((error) => {
                toastAndLogError(error, "Something went wrong")
            }).finally(() => setLoading(false));
    }

    const signInWithEmail = (email: string, password: string) => {
        if (!email || !password) return;

        const toastId = toast.loading("Please wait... Loading data");
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const uid = result.user.uid;
                const dataRef = doc(db, "Users", uid);
                const userDoc = await getDoc(dataRef);
                toast.dismiss(toastId);

                if (userDoc.exists()) {
                    const userData = userDoc.data() as UserData || {};
                    uploadUserData(userData)
                }

                toast.success("Successfully logged in");
                router.push('/')
            })
            .catch((error) => {
                toastAndLogError(error, "Incorrect email or password")
            }).finally(() => setLoading(false));
    }

    const authWithGoogle = () => {
        setLoading(true);
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const userId = result.user.uid;

                const dataRef = doc(db, "Users", userId);
                const userDoc = await getDoc(dataRef);

                if (userDoc.exists()) {
                    uploadUserData(userDoc.data() as UserData)
                }
                else {
                    const dataState = getUserData();
                    await setDoc(dataRef, dataState, { merge: true });
                }

                toast.success("Successfully logged in");
                router.push('/');
            }).catch((error) => {
                toastAndLogError(error, "Something went wrong")
            }).finally(() => setLoading(false));
    }

    const toastAndLogError = (error: any, toastText: string) => {
        console.error(error);
        toast.dismissAll();
        toast.error(toastText);
    }

    return {signUpWithEmail, signInWithEmail, authWithGoogle}
}

export default useAuth