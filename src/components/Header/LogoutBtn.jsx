import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import Button from "../Button";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
        dispatch(logout())
    })
    .catch(error => {
        console.log("LogoutBtn :: logoutHandler :: error", error);
    })
  };

  return (
    <Button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
