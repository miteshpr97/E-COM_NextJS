import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/cart">Cart</Link></li>
        <li><Link href="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
