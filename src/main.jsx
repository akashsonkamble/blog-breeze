import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { Provider } from "react-redux";

import store from "./store/store.js";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "./components";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import AddPostPage from "./pages/AddPost";
import AllPostsPage from "./pages/AllPosts";
import EditPostPage from "./pages/EditPost";
import PostPage from "./pages/Post";
import ErrorPage from "./pages/Error";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <LoginPage />
                    </AuthLayout>
                )
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <SignupPage />
                    </AuthLayout>
                )
            },
            {
                path: "/all-posts",
                element: (
                    <AuthLayout authentication>
                    {" "}
                        <AllPostsPage />
                    </AuthLayout>
                )
            },
            {
                path: "/add-post",
                element: (
                    <AuthLayout authentication>
                    {" "}
                        <AddPostPage />
                    </AuthLayout>
                )
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <AuthLayout authentication>
                    {" "}
                        <EditPostPage />
                    </AuthLayout>
                )
            },
            {
                path: "/post/:slug",
                element: <PostPage />
            },
        ],
    },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);