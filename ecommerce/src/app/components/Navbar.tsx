"use client";

import Link from "next/link";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
  const { user } = useUser();

  console.log(user, "userDtaa");

  return (
    <nav className="bg-gray-900 p-3 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/">
            <span className="text-2xl font-bold text-yellow-400 hover:text-white transition-colors">
              ShopMate
            </span>
          </Link>
        </div>

        {/* Navbar Links */}
        <ul className="hidden md:flex space-x-6 text-white">
          <li>
            <Link href="/">
              <span className="hover:text-yellow-400 transition-colors">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <span className="hover:text-yellow-400 transition-colors">
                Cart
              </span>
            </Link>
          </li>
          <li>
            <Link href={`/profile/${user?.id}`}>
              <span className="hover:text-yellow-400 transition-colors">
                My Profile
              </span>
            </Link>
          </li>

          <span>{user?.userName}</span>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
