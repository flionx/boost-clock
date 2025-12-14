"use client"
import { useEffect, useRef, useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/shared/lib/firebase';
import { useRouter } from 'next/navigation';
import getUserData from '@/shared/lib/getUserData';
import toast from 'react-hot-toast';
import uploadUserData from '@/shared/lib/uploadUserData';
import { UserData } from '@/shared/types/user-data';

const useAuth = () => {
    const [isEmailVerifySent, setIsEmailVerifySent] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!isEmailVerifySent) return;
        
        intervalRef.current = setInterval(() => {
            if (auth.currentUser) {
                auth.currentUser.reload().then(() => {
                    if (auth.currentUser && auth.currentUser.emailVerified) {
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                        };
                        toast.dismissAll();
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

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const user = result.user;
                const dataRef = doc(db, 'Users', user.uid);
                const userData = getUserData();                
                const toastId = toast.loading("Please, wait...");
                await setDoc(dataRef, userData, { merge: true });
                toast.dismiss(toastId);
                sendVerifEmail(user);
            })
            .catch((error) => {
                toastAndLogError(error, "Something went wrong")
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
            });
    }

    const signInWithEmail = (email: string, password: string) => {
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {

                const uid = result.user.uid;
                const dataRef = doc(db, "Users", uid);
                const toastId = toast.loading("Please wait... Loading data");
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
            })
    }

    const toastAndLogError = (error: any, toastText: string) => {
        console.error(error);
        toast.dismissAll();
        toast.error(toastText);
    }

    return {signUpWithEmail, signInWithEmail}
}

export default useAuth