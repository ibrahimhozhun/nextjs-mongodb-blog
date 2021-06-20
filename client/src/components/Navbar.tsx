import Link from "next/link";
import React, { useState } from "react";
import Modal from "./Modal";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const links: string[] = ["Posts", "About", "Outputs", "Partnership"];

  return (
    <header className="nav-root">
      <div className="nav-container">
        <button className="nav-menu-icon" onClick={() => setIsMenuOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link href="/">
          <a className="nav-title">Anti-Bullying Blog</a>
        </Link>
        <NavLinks links={links} />
        <Modal links={links} isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </div>
    </header>
  );
};

const NavLinks: React.FC<{ links: string[] }> = ({ links }) => (
  <nav className="nav-links hidden lg:block">
    {links.map((link) => (
      <Link key={link} href={`/${link.toLowerCase()}`}>
        <a className="nav-link">{link}</a>
      </Link>
    ))}
  </nav>
);

export default Navbar;
