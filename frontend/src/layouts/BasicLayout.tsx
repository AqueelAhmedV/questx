import React from 'react';

export const BasicLayout = ({ children }: { [key: string]: any }) => {
  return (
    <div className="flex flex-col min-h-screen items-center">
      {/* <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          Header
        </div>
      </header> */}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      {/* <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          Footer
        </div>
      </footer> */}
    </div>
  );
};

