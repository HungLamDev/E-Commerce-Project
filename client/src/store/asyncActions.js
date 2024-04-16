import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../apis'
// viết action bất đồng bộ
export const getCategories = createAsyncThunk('app/categories' , async(data,{rejectWithValue}) =>{

    // gọi api
    const response = await apis.apiGetCategories()
    console.log(response);
    if(!response.success) return rejectWithValue(response )
    return response
}) 