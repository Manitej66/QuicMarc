import React from 'react'

const Nav = () => {

    return (
        <div className="flex fixed w-screen flex-row justify-between items-center p-3 bg-gray-900 sm:justify-around ">
            <a href="/" className="font-myfont text-xl font-bold text-purple-100">QuicMarc</a>
            <div className="flex flex-row ">
            <a href="/dashboard">
            <img src="https://img.icons8.com/office/50/000000/add-list.png" alt="dashboard" className="w-8 mr-4"/>
            </a>
            <a href="/">
            <img src="https://img.icons8.com/fluent/48/000000/filled-sent.png" alt="Email" className="w-8" />
            </a>
            </div>
        </div>
    )
}

export default Nav
