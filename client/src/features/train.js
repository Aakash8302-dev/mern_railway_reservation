import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    routes: {
        data: null,
        status: 'idle',
        error: null
    },
    stops: {
        data: null,
        status: 'idle',
        error: null
    }, 
    status: 'idle',
    error: null,

}

export const trainSearch = createAsyncThunk('train/search', async (userData, thunkAPI) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const {from, to} = userData

        const {data} = await axios.get(`/api/train/search/${from}/${to}`, config);

       if(data.status=== "ok"){
            return data;
       }else if(data.status === "error"){
            throw new Error(data.error)
       }
})

export const findStops = createAsyncThunk('train/findstops', async (userData, thunkAPI) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const {data} = await axios.get(`/api/train/findstops`, config);

   if(data.status=== "ok"){
        return data;
   }else if(data.status === "error"){
        throw new Error(data.error)
   }
})


export const trainSlice = createSlice({
    name: "train",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(trainSearch.pending, (state, action) => {
            state.routes.status = "loading"
            state.routes.error = null
        }).addCase(trainSearch.fulfilled, (state, action) => {
            state.routes.status = "ok"
            state.routes.error = null
            state.routes = action.payload
        }).addCase(trainSearch.rejected, (state, action) => {
            state.routes.status = "error"
            state.routes.data = null
            state.routes.error = action.error.message
        }).addCase(findStops.pending, (state, action)=> {
            state.status = "loading"
            state.error = null
        }).addCase(findStops.fulfilled, (state, action)=> {
            state.status = "ok"
            state.error = null
            state.stops = action.payload.data
        }).addCase(findStops.rejected, (state,action)=>{
            state.status = 'error'
            state.stops.error = action.error.message
        })
    }
})

export default trainSlice.reducer