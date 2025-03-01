import { createSlice } from "@reduxjs/toolkit";
const getInitialUser = () => {
    const storage = localStorage.getItem("user"); 
    return storage ? JSON.parse(storage) : null;
};
  
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: getInitialUser(),
    },
    reducer: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user))
        },
        removeUser: (state) => {
            state.user = null;
            localStorage.setItem("user", '')
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
