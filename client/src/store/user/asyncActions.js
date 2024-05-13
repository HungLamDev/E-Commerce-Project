// viết get api theo bất đồng bộ
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'
// viết action bất đồng bộ
export const getCurrent = createAsyncThunk('user/current' , async (data,{rejectWithValue}) =>{
    // gọi api
    const response = await apis.apiGetCurrent()
    console.log(response);
    if(!response.success) return rejectWithValue(response )
    return response.rs
}) 