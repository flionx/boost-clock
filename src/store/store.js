import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './slices/tasksSlice'
import mainTaskSlice from './slices/mainTaskSlice'
import settingSlice from './slices/settingSlice'

export default configureStore({
  reducer: {
    tasks: tasksSlice,
    mainTask: mainTaskSlice,
    settings: settingSlice,
  }
})