import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        isFetchChatAgain: false,
    },
    reducers: {
        setIsFetchChatAgain: (state, action) => {
            state.isFetchChatAgain = action.payload;
        },
    },
});

const { actions, reducer } = chatSlice;
export const { setIsFetchChatAgain } = actions;
export default reducer;
