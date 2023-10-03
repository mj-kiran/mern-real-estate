import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const combineReducer = combineReducers({
    user:userSlice
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1
    
}

const persistedReducer=persistReducer(persistConfig,combineReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    })
});

export const persistor=persistStore(store)
