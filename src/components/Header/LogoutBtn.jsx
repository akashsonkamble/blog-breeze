import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
        dispatch(logout())
        navigate("/login");
        
    })
    .catch(error => {
        console.log("LogoutBtn :: logoutHandler :: error", error);
    })
  };

  return (
    <Button className="inline-block px-6 py-2 duration-200 hover:bg-#26507a hover:border-#26507a active:bg-#26507a focus:outline-none rounded-full"
      onClick={logoutHandler}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
