'use client';

import { BookOpen, BookOpenText, CircleUser, Home, Library, LogOut, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const Layout = ({ children }: { children: ReactNode }) => {
  const currentPath = usePathname()
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Add event listeners for route changes
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);

    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, []);

  // Helper function to determine if the link is active
  const isActive = (path: string) => currentPath === path;

  const handleSignOut = () => {
    // Remove JWT token from localStorage
    localStorage.removeItem('jwt_token');
    // Redirect to login page or home
    router.push('/authen/login'); // or wherever your login page is
  };

  return (
    <div className="flex min-h-screen">
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-[228px] bg-[#6FBC44] fixed h-screen">
        <div className="p-10">
          <Image
            src="/assets/images/fpt-logo.png"
            alt="FPT Logo"
            width={150}
            height={50}
            className="mb-8"
          />
        </div>
        <nav className="text-white">
          <Link href="/" className={`flex items-center px-6 py-3 ${isActive('/') ? 'bg-[#5da639]' : 'hover:bg-[#5da639]'}`}>
            <Home className="w-6 h-6 mr-4" />
            <span className="font-bold">Home</span>
          </Link>

          <Link href="/feature/view-user-list" className={`flex items-center px-6 py-3 ${isActive('/feature/view-user-list') ? 'bg-[#5da639]' : 'hover:bg-[#5da639]'}`}>
            <Users className="w-6 h-6 mr-4" />
            <span className="font-bold">User Management</span>
          </Link>

          <Link href="/feature/view-curriculum-list" className={`flex items-center px-6 py-3 ${isActive('/feature/view-curriculum-list') ? 'bg-[#5da639]' : 'hover:bg-[#5da639]'}`}>
            <Library className="w-6 h-6 mr-4" />
            <span className="font-bold">Curriculum Management</span>
          </Link>

          <Link href="/feature/view-subject-list" className={`flex items-center px-6 py-3 ${isActive('/feature/view-subject-list') ? 'bg-[#5da639]' : 'hover:bg-[#5da639]'}`}>
            <BookOpenText className="w-6 h-6 mr-4" />
            <span className="font-bold">Subject Management</span>
          </Link>

          <Link href="/feature/view-system-setting" className={`flex items-center px-6 py-3 mt-60 ${isActive('/feature/view-system-setting') ? 'bg-[#5da639]' : 'hover:bg-[#5da639]'}`}>
            <Settings className="w-6 h-6 mr-4" />
            <span className="font-bold">Setting</span>
          </Link>

          <Link href="/authen/view-profile" className={`flex items-center px-6 py-3 ${isActive('/authen/view-profile') ? 'bg-[#5da639]' : 'hover:bg-[#5da639]'}`}>
            <CircleUser className="w-6 h-6 mr-4" />
            <span className="font-bold">My Profile</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center px-6 py-3 hover:bg-[#5da639] text-left"
          >
            <LogOut className="w-6 h-6 mr-4" />
            <span className="font-bold">Sign out</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className='flex-1'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
