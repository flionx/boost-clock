import { uploadAchievs } from "../store/slices/achievementSlice";
import { setMainTask } from "../store/slices/mainTaskSlice";
import { uploadReport } from "../store/slices/reportSlice";
import { uploadSettings } from "../store/slices/settingSlice";
import { uploadTasks } from "../store/slices/tasksSlice";
import { IUploadData } from "../types/global";
import { useAppDispatch } from "./useRedux";

const useSaveUploadState = () => {
    const dispatch = useAppDispatch();

    function uploadUserData(data: IUploadData): void {
        dispatch(uploadAchievs(data.achievement))
        dispatch(setMainTask(data.mainTask))
        dispatch(uploadReport(data.report))
        dispatch(uploadSettings(data.settings))
        dispatch(uploadTasks(data.tasks))        
    }
    
    return {uploadUserData};
}

export default useSaveUploadState;

