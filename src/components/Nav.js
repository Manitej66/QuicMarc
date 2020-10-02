import React from "react";

const Nav = () => {
  return (
    <div className="flex fixed w-screen flex-row justify-between items-center p-3 bg-gray-900 sm:justify-around ">
      <a href="/" className="font-myfont text-xl font-bold text-purple-100">
        QuicMarc
      </a>
      <div className="flex flex-row text-white font-myfont">
        <a href="/dashboard">Dashboard</a>
      </div>
    </div>
  );
};

export default Nav;
