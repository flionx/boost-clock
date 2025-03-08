import { useDispatch } from "react-redux";
import { uploadAchievs } from "../store/slices/achievementSlice";
import { setMainTask } from "../store/slices/mainTaskSlice";
import { uploadReport } from "../store/slices/reportSlice";
import { uploadSettings } from "../store/slices/settingSlice";
import { uploadTasks } from "../store/slices/tasksSlice";

const useSaveUploadState = () => {

    const dispatch = useDispatch();

    function uploadUserData(data) {
        dispatch(uploadAchievs(data.achievement))
        dispatch(setMainTask(data.mainTask))
        dispatch(uploadReport(data.report))
        dispatch(uploadSettings(data.settings))
        dispatch(uploadTasks(data.tasks))        
    }
    return {uploadUserData};
}

export default useSaveUploadState;

