import { useState } from "react";

import { Button, Container, Logo, LogoutBtn } from "../index";

import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);

    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    const openMobileMenuHandler = () => {
        setOpenMobileMenu((prev) => !prev);
    };

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
      ];
    
    return (
        <header className="relative py-3 bg-#d2e2f2 border-b-2 border-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="150px" />
                        </Link>
                    </div>
                    <ul className="hidden md:flex items-center ml-auto">
                        {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                            <Button
                                className="inline-block mr-4 px-6 py-2 duration-200 rounded-full"
                                onClick={() => navigate(item.slug)}
                            >
                                {item.name} 
                            </Button>
                            </li>
                        ) : null
                        )}
                        {authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                        )}
                    </ul>
                    <div className="absolute right-5 top-6 flex items-center ml-auto ring-1 ring-[#26507a] md:hidden" onClick={openMobileMenuHandler}>
                        {openMobileMenu ? (
                        <svg className="h-6 w-6 cursor-pointer text-[#26507a] hover:text-[#26507d]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        ) : (
                        <svg className="h-6 w-6 cursor-pointer text-[#26507a] hover:text-[#26507d]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                        )}
                    </div>
                </nav>
                {openMobileMenu && (
                    <ul className="flex flex-col items-center justify-center my-5 space-y-4 md:hidden" onClick={openMobileMenuHandler}>
                        {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                            <Button
                                className="inline-block px-6 py-2 duration-200 rounded-full"
                                onClick={() => navigate(item.slug)}
                            >
                                {item.name}
                            </Button>
                            </li>
                        ) : null
                        )}
                        {authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                        )}
                    </ul>
                )}
            </Container>
        </header>
    )
}

export default Header;