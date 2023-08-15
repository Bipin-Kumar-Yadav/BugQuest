import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
}
const BugSlice = createSlice({
    name : "bug",
    initialState : initialState,
    reducers : {
        setLoading (state,action){
            state.loading = action.payload;
        }
    }
})

export const {setLoading} = BugSlice.actions;
export default BugSlice.reducer;
