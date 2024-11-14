'use client';

import { BookOpen, BookOpenText, CircleUser, Home, Library, LogOut, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Layout from '@/app/feature/layout';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const currentPath = usePathname()

  // Helper function to determine if the link is active
  const isActive = (path: string) => currentPath === path;

  return (
    <Layout children={children}/>
  );
};

export default AuthLayout;
