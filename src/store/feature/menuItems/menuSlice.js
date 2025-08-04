import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuItems: (state, action) => {
            state.items = action.payload;
        },
        addMenuItem: (state, action) => {
            state.items.push(action.payload);
        },
        deleteMenuItem: (state, action) => {
            state.items = state.items.filter(item => item.$id !== action.payload);
        },
        updateMenuItem: (state, action) => {
            const index = state.items.findIndex(item => item.$id === action.payload.$id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
});

export const {
    setMenuItems,
    addMenuItem,
    deleteMenuItem,
    updateMenuItem, 
} = menuSlice.actions;

export default menuSlice.reducer;
