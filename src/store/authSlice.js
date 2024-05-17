import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            localStorage.setItem('userData', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            localStorage.removeItem('userData');
        },
        rehydrate: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        }
    }
})

export const { login, logout, rehydrate } = authSlice.actions;

export default authSlice.reducer;