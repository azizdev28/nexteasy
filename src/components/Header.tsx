import React from "react";

const Header = () => {
  return (
    <div className="Header ">
      <div className="container bg-white navbar flex justify-between py-5 items-center px-20">
        <h2 className="text-base font-semibold font-mono">
          Where in the world?
        </h2>

        <button className="text-base font-semibold font-mono border-solid border-inherit shadow-sm rounded-lg hover:bg-sky-700 	py-3 px-5">
          Dark Mode
        </button>
      </div>
    </div>
  );
};

export default Header;
