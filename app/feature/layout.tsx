'use client';

import { BookOpen, Home, LibraryBig, LogOut, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
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
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Home className="w-6 h-6 mr-4" />
            <span className="font-bold">Home</span>
          </a>
          <Link className="flex items-center px-6 py-3 hover:bg-[#5da639]" href="/feature/view-user-list">
            <Users className="w-6 h-6 mr-4" />
            <span className="font-bold">User Management</span>
          </Link>

          <a href="/feature/view-curriculum-list" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookOpen className="w-6 h-6 mr-4" />
            <span className="font-bold">Curriculum Management</span>
          </a>

          <Link href="/feature/view-system-setting" className="flex items-center px-6 py-3 mt-60 hover:bg-[#5da639]">
            <Settings className="w-6 h-6 mr-4" />
            <span className="font-bold">Setting</span>
          </Link>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <LogOut className="w-6 h-6 mr-4" />
            <span className="font-bold">Sign out</span>
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className='flex-1'>
        {children}
      </div>
    </div>
  )
}

export default layout