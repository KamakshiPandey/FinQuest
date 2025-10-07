import { createSlice } from '@reduxjs/toolkit';

const isTokenExpired = () => {
    const tokenExpirationTime = localStorage.getItem("StockVoyager_tokenExpiration");
    if (!tokenExpirationTime) return true;
    const currentTime = new Date().getTime();
    return currentTime > tokenExpirationTime;
};

// Check for token and its expiration during initial state setup
let initialToken = localStorage.getItem("StockVoyager_token");
if (initialToken && isTokenExpired()) {
    localStorage.clear();
    initialToken = null;
}

const initialState = {
    signupData: null,
    loading: null,
    token: initialToken ? JSON.parse(initialToken) : null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action) {
            const { payload } = action;
            state.token = payload;
            localStorage.setItem("StockVoyager_token", JSON.stringify(payload));
            localStorage.setItem("StockVoyager_tokenExpiration", new Date().getTime() + 24 * 60 * 60 * 1000); // Set new expiration time            
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setSignupData(state, action) {
            state.signupData = action.payload;
        },
    },
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;
