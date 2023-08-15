import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    signupData : null,
    loading : false,
    token  : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
};


const AuthSlice = createSlice({
    name:"auth",
    initialState : initialState,
    reducers : {
        setSignUpData(state,value){
            state.signupData = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        },
        setToken(state,value){
            state.token = value.payload;
        }
    }
})

export const  {setSignUpData,setLoading,setToken} = AuthSlice.actions;
export default AuthSlice.reducer;