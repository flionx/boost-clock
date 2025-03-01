import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc } from "firebase/firestore";
import useFecthUserData from "./useFetchUserData";

const useAuth = () => {

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log('зареган');
            const uid = user.uid;
        } else {
            console.log('не зареган');
        }
    });
}

export default useAuth;