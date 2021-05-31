import Link from "next/link";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className="nav-root">
      <div className="nav-container">
        <button
          className="nav-menu-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/">
          <a className={`pr-4 lg:block font-medium dark:text-white ml-3 text-xl ${isMenuOpen && "hidden"}`}>
            Anti-Bullying Blog
          </a>
        </Link>
        <NavLinks isMenuOpen={isMenuOpen} />
      </div>
    </header>
  )
}

const NavLinks: React.FC<{ isMenuOpen?: boolean }> = ({ isMenuOpen }) => (
  <nav className={`nav-links ${!isMenuOpen && "hidden"}`
  }
  >
    <Link href="/posts"><a className="nav-link">Posts</a></Link>
    <Link href="/about"><a className="nav-link">About</a></Link>
  </nav>
)

export default Navbar;
