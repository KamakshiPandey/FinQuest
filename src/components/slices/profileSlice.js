import {createSlice} from '@reduxjs/toolkit'
import { VscLaw } from 'react-icons/vsc';

const initialState={
    user:localStorage.getItem("StockVoyager_user")?JSON.parse(localStorage.getItem("StockVoyager_user")):null,
    searchQuery:"",
    loading:null,
    stockTitleLoading:false,
    stockDetailLoading:false,
}

export const profileSlice=createSlice({
    name:"profile",
    initialState,
    reducers:{
        setUser:(state,value)=>{
            state.user=value.payload;
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setSearchQuery(state,value){
            state.searchQuery=value.payload
        },
        setStockTitleLoading(state,value){
            state.stockTitleLoading=value.payload
        },
        setStockDetailsLoading(state,value){
            state.stockDetailLoading=value.payload
        }
    }
})

export const {setUser,setLoading,setSearchQuery,setStockDetailsLoading,setStockTitleLoading}=profileSlice.actions;
export default profileSlice.reducer;