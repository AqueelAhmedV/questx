import React from 'react';
import { NavbarDefault } from '../components/NavbarDefault';
import { useProfile } from '../contexts/ProfileContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BasicLayout = ({ children }: { [key: string]: any }) => {

  // const { showNavbar } = useProfile()

  return (
    <div className="flex flex-col h-screen items-center">
      <NavbarDefault openDrawer={() => {}} />
      <main className="flex-grow h-full w-full mx-0 mt-5">
        {children}
      </main>
      {/* <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          Footer
        </div>
      </footer> */}
      <ToastContainer />
    </div>
  );
};

