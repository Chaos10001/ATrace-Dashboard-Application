import React from "react";

const SideBar = () => {
  return (
    <div>
      <div className="bg-gray-800 h-screen w-64">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <span className="text-white text-2xl mx-2 font-semibold">
              aTrace
            </span>
          </div>
        </div>
        <nav className="mt-10">
          <a
            href="#"
            className="flex items-center text-white py-2 pl-4 nav-item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
            <span className="mx-2">Home</span>
          </a>
          <a
            href="#"
            className="flex items-center text-white py-2 pl-4 nav-item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="mx-2">About</span>
          </a>
          <a
            href="#"
            className="flex items-center text-white py-2 pl-4 nav-item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="mx-2">Services</span>
          </a>
          <a
            href="#"
            className="flex items-center text-white py-2 pl-4 nav-item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="mx-2">Contact</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
