//// burası redux store kayıt yeri
import {configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import productReducer from "./slice/productSlice"
import filterReducer from "./slice/filterSlice"

//reducerları ekleyeceğimiz yer
const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterReducer
})

//burada reducerlar store a kaydediliyor
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
