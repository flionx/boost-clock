import { useAppDispatch, useAppStore } from "../useRedux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { setWaitModal } from "../../store/slices/settingSlice";
import getFilteredState from "../../utils/getFilteredState";
import useSaveUploadState from "../useSaveUploadState";
import { IUploadData } from "../../types/global";
import { RootState } from "../../store/store";

const useAuthGoogle = () => {
    const store = useAppStore();
    const dispatch = useAppDispatch();
    const {uploadUserData} = useSaveUploadState();
    const navigate = useNavigate();
    
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const userId = result.user.uid;

                const dataRef = doc(db, "Users", userId);
                const userDoc = await getDoc(dataRef);

                if (userDoc.exists()) {
                    uploadUserData(userDoc.data() as IUploadData)
                }
                else {
                    const dataState = getFilteredState(store.getState() as RootState);
                    await setDoc(dataRef, dataState, { merge: true });
                }
                navigate('/');

            }).catch((error) => {
                console.log(error.code);
                dispatch(setWaitModal({status: 'red', hasWait: true, message: 'Something went wrong'}))           
            })
    }

  return (signInWithGoogle)
}

export default useAuthGoogle