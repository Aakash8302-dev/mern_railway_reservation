import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    userLoggedIn: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem('userInfo')) : null,
    value: '',
    status: 'idle',
    error: null,
}

export const userRegister = createAsyncThunk('user/register', async (userData, thunkAPI) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const {name, username, password} = userData

        const {data} = await axios.post('/api/user/register', {username, name,password}, config);

        console.log(data)

       if(data.status=== "ok"){
            return data;
       }else if(data.status === "error"){
            throw new Error(data.error)
       }

})

export const userLogin = createAsyncThunk('user/login', async (userData, thunkAPI) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const {username, password} = userData
    const {data} = await axios.post('/api/user/login', {username,password}, config);

    console.log(data);

    if(data.status=== "ok"){
        return data;
   }else if(data.status === "error"){
        throw new Error(data.error)
   }
})


export const userLogout = createAsyncThunk('user/logout', async(userData, thunkAPI) => {
    localStorage.removeItem("userInfo");
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(userRegister.pending, (state, action) => {
            state.status = "loading"
            state.error = null
            state.value = null
        }).addCase(userRegister.fulfilled, (state, action) => {
            state.status = "ok"
            state.error = null
            state.value = null
        }).addCase(userRegister.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
            state.value = null
        }).addCase(userLogin.pending, (state, action)=>{
            state.status = "loading"
        }).addCase(userLogin.fulfilled, (state, action)=>{
            state.status = "ok"
            state.userLoggedIn = {
                token : action.payload.token,
                name : action.payload.name,
                id: action.payload.id
            }
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        }).addCase(userLogin.rejected, (state,action)=>{
            state.status = 'error'
            state.error = action.error.message
        }).addCase(userLogout.pending, (state, action)=>{
            state.status = 'loading'
        }).addCase(userLogout.fulfilled, (state,action)=>{
            state.status = 'ok'
            state.userLoggedIn = null
        }).addCase(userLogout.rejected, (state, action)=>{
            state.status= 'error'
        })
    }
})

export const { register, logout } = userSlice.actions


export default userSlice.reducer