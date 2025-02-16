import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './slices/tasksSlice'
import mainTaskSlice from './slices/mainTaskSlice'

export default configureStore({
  reducer: {
    tasks: tasksSlice,
    mainTask: mainTaskSlice,
  }
})