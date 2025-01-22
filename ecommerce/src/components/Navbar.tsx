import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white">
        <li><Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
        <li><Link href="/cart" className="hover:text-yellow-400 transition-colors">Cart</Link></li>
        <li><Link href="/profile/1" className="hover:text-yellow-400 transition-colors">My Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
