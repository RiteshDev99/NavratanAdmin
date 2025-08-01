import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice"
import MenuItemsReducer from "./feature/menuItems/menuSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        menuItems: MenuItemsReducer
    }
})

export default store;
