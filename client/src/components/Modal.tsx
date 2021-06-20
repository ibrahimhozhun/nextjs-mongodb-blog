import Link from "next/link";

const Modal: React.FC<{
  links: string[];
  isOpen: boolean;
  setIsOpen: (state: false) => void;
}> = ({ links, isOpen, setIsOpen }) => {
  return (
    <div
      onClick={() => setIsOpen(false)}
      className={`lg:hidden ${isOpen ? "modal-bg" : "hidden"}`}
    >
      <div className="modal">
        {links.map((link) => (
          <Link key={link} href={`/${link.toLowerCase()}`}>
            <a className="nav-link">{link}</a>
          </Link>
        ))}
        <button className="modal-btn" onClick={() => setIsOpen(false)}>
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Modal;
