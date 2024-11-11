'use client';

import { BookOpen, Home, LogOut, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const Layout = ({ children }: { children: ReactNode }) => {
  const currentPath = usePathname()

  // Helper function to determine if the link is active
  const isActive = (path: string) => currentPath === path;

  return (
    <div className="flex min-h-screen">
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
            <BookOpen className="w-6 h-6 mr-4" />
            <span className="font-bold">Curriculum Management</span>
          </Link>

          <Link href="/feature/view-system-setting" className={`flex items-center px-6 py-3 mt-60 ${isActive('/feature/view-system-setting') ? 'bg-[#5da639]' : 'hover:bg-[#5da639]'}`}>
            <Settings className="w-6 h-6 mr-4" />
            <span className="font-bold">Setting</span>
          </Link>

          <Link href="/signout" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <LogOut className="w-6 h-6 mr-4" />
            <span className="font-bold">Sign out</span>
          </Link>
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
