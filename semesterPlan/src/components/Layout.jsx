import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <> 
        <div className="bg-slate-100 min-h-screen flex flex-col max-h-screen">
            <NavBar />
            <div className='flex justify-center items-center flex-grow h-screen w-screen py-12'>
                <Outlet />
            </div>
        </div>
    </>
  );
};
