"use client";

import Link from "next/link";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { user } = useUser();
  const redirect = useRouter();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { carts } = useSelector((state: RootState) => state.cart);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    Cookies.remove("token");
    redirect.push("/auth/login");
  };

  return (
    // <nav className="bg-gray-900 p-3 shadow-lg">
    //   <div className="max-w-screen-xl mx-auto flex justify-between items-center" style={{background:"orange"}}>
    //     {/* Logo */}
    //     <div style={{ background: 'pink' }} className="max-w-24">
    //       <Link href="/">
    //         <span className="text-2xl font-bold text-yellow-400 hover:text-white transition-colors">
    //           ShopMate
    //         </span>
    //       </Link>
    //     </div>


    //     <div style={{ background: "red"}} className="min-w-96" >

    //       {/* Navbar Links */}
    //       <ul className="hidden md:flex space-x-6 text-white">
    //         <li>
    //           <Link href="/">
    //             <span className="hover:text-yellow-400 transition-colors">Home</span>
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href="/viewcart">
    //             <div className="relative inline-block">
    //               <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
    //               {carts.length > 0 && (
    //                 <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
    //                   {carts.length}
    //                 </span>
    //               )}
    //             </div>
    //           </Link>
    //         </li>

    //       </ul>


    //       {/* Dropdown */}
    //       <div className="relative" ref={dropdownRef}>
    //         <button
    //           onClick={toggleDropdown}
    //           className="text-white bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-full text-sm font-medium flex items-center"
    //           aria-label="User Menu"
    //         >
    //           <span>{user?.userName || "Menu"}</span>
    //           <svg
    //             className="ml-2 w-4 h-4"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    //           </svg>
    //         </button>
    //         {isDropdownOpen && (
    //           <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
    //             <Link href={`/profile/${user?.id}`}>
    //               <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
    //                 Profile
    //               </span>

    //             </Link>

    //             <a href="/forgot-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
    //               Forget Password
    //             </a>
    //             <button
    //               onClick={handleLogout}
    //               className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
    //             >
    //               Log out
    //             </button>
    //           </div>
    //         )}
    //       </div>

    //     </div>


    //   </div>
    // </nav>


    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div>
          <Link href="/">
            <span className="text-2xl font-extrabold text-yellow-400 hover:text-yellow-500 transition-all">
              ShopMate
            </span>
          </Link>
        </div>


        <div style={{width:"20%" , display:"flex", justifyContent:"end"}}>

          {/* Navbar Links */}
          <div className="hidden md:flex items-center space-x-6 mr-5">
            <Link href="/">
              <span className="hover:text-yellow-400 transition-all">Home</span>
            </Link>
            <Link href="/viewcart">
              <div className="relative">
                <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
                {carts.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white font-bold rounded-full px-2 py-0.5">
                    {carts.length}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium"
            >
              <span>{user?.userName || "Menu"}</span>
              <svg
                className="ml-2 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <Link href={`/profile/${user?.id}`}>
                  <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</span>
                </Link>
                <Link href="/forgot-password">
                  <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Forgot Password</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </nav>


  );
};

export default Navbar;
