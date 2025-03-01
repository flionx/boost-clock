import { useDispatch } from "react-redux";
import { uploadAchievs } from "../store/slices/achievementSlice";
import { uploadMainTask } from "../store/slices/mainTaskSlice";
import { uploadReport } from "../store/slices/reportSlice";
import { uploadSettings } from "../store/slices/settingSlice";
import { uploadTasks } from "../store/slices/tasksSlice";

const useFetchUserData = () => {

    const dispatch = useDispatch();

    async function uploadUserData(data) {
        dispatch(uploadAchievs(data.achievement))
        dispatch(uploadMainTask(data.mainTask))
        dispatch(uploadReport(data.report))
        dispatch(uploadSettings(data.settings))
        dispatch(uploadTasks(data.tasks))
        console.log('Данные получены из БД:');
    }
    return uploadUserData;
}

export default useFetchUserData;

