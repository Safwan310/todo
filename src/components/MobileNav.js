import React from "react";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const handleClick = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("-translate-x-full");
  };
  return (
    <div className="bg-secondary text-primary flex justify-between md:hidden">
      <Link className="block p-4">DoD</Link>
      <button className="mobile-menu-button p-4 " onClick={handleClick}>
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default MobileNav;
