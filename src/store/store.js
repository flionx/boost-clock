import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './slices/tasksSlice'
import mainTaskSlice from './slices/mainTaskSlice'
import settingSlice from './slices/settingSlice'
import reportSlice from './slices/reportSlice'
import achievementSlice from './slices/achievementSlice'

export default configureStore({
  reducer: {
    tasks: tasksSlice,
    mainTask: mainTaskSlice,
    settings: settingSlice,
    report: reportSlice,
    achievement: achievementSlice,
  }
})