import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const useAuth = (setUser) => {
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(true)
        } else {
            setUser(false)
        }
    });
}

export default useAuth;