import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        updatePost: (state, action) => {
            const { postId, updatedData } = action.payload;
            const postToUpdate = state.posts.find((post) => post.$id === postId);
            if (postToUpdate) {
                postToUpdate.title = updatedData.title;
                postToUpdate.content = updatedData.content;
                postToUpdate.status = updatedData.status;
            }
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post.$id !== action.payload);
        }
    }
})

export const { setPosts, addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;