"use client"
import { useEffect, useRef } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/shared/lib/firebase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const useAuth = () => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    useEffect(() => {
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
    }, []);

    function signUpWithEmail(email: string, password: string) {
        if (!email || !password) return;

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const user = result.user;
                // todo: save user data
                const dataState = {test: "hello world"};
                const dataRef = doc(db, 'Users', user.uid);
                const toastId = toast.loading("Please, wait...");
                await setDoc(dataRef, dataState, { merge: true });
                toast.dismiss(toastId);
                sendVerifEmail(user);
            })
            .catch((error) => {
                console.log(error.code);
                toast.error("Something went wrong");
            });
        }
        
        function sendVerifEmail(user: User) {
            sendEmailVerification(user)
            .then(() => {
                toast.loading("Email verification sent");
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something went wrong");
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
                    
                    const userData = userDoc.data() || {};
                    // todo: upload user data to zustand  
                    
                    // uploadUserData({
                    //     achievement: userData.achievement || [],
                    //     report: userData.report || {},
                    //     settings: userData.settings || {},
                    //     tasks: userData.tasks || [],
                    // });
                    
                }
                router.push('/')
            })
            .catch((error) => {
                console.log(error);
                toast.error('incorrect email or password');
            })
    }

    return {signUpWithEmail, signInWithEmail}
}

export default useAuth