import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { TSetState } from "../types/global";

const useAuth = (setUser: TSetState<boolean>) => {
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(true)
        } else {
            setUser(false)
        }
    });
}

export default useAuth;