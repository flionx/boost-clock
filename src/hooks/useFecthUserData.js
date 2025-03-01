import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";

const useFecthUserData = () => {

    const dispatch = useDispatch();

    async function fetchUserData(uid) {
        const userRef = doc(db, "Users", uid)
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
            docSnap.data();
        }
    }

    return {fetchUserData};
}

export default useFecthUserData;