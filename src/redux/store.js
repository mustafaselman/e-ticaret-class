//// burası redux store kayıt yeri
import {configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"

//reducerları ekleyeceğimiz yer
const rootReducer = combineReducers({
    auth: authReducer,
})

//burada reducerlar store a kaydediliyor
const store = configureStore({
    reducer: rootReducer
})

export default store
