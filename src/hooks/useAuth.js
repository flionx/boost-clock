import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useDispatch } from "react-redux";
import { doc } from "firebase/firestore";

const useAuth = () => {

    const dispatch = useDispatch();

    onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          console.log('зареган');
          
        } else {
            console.log('не зареган');
        }
    });
}

export default useAuth;