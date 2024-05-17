import { useState, useEffect } from "react";

import { Header, Footer } from "./components";

import { useDispatch } from "react-redux";

import authService from "./appwrite/auth";

import { login, logout, rehydrate } from "./store/authSlice";

import { Outlet } from "react-router";

import { ToastContainer } from "react-toastify";

const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            dispatch(rehydrate(JSON.parse(storedUserData)));
        } else {
            authService
                .getCurrentUser()
                .then((userData) => {
                    console.log("App :: userData :: ", userData);
                    if (userData) {
                        dispatch(login(userData));
                    } else {
                        dispatch(logout());
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        setLoading(false);
    }, [dispatch]);

    return !loading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-#d2e2f2">
            <div className="w-full block">
                <Header />
                <ToastContainer position="top-center" />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : null;
}

export default App;