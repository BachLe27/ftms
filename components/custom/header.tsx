"use client";

import React, { useEffect, useState } from "react";
import MainNav from "@/components/custom/main-nav";
import UserButton from "./user-button";
import UserNotification from "./user-notification";
import Image from "next/image";
import { ThemeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";
import logo from "@/public/assets/images/logo.svg fill.png"
import { usePathname, useRouter } from "next/navigation";
import LogoSmall from "@/public/logo.svg"
import { Session } from "next-auth";
import { authRoutes } from "@/routes";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AlignJustifyIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type WindowProps = {
  innerWidth: number;
  innerHeight: number;
}

const Header = ({ user }: { user: Session['user'] }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)
  const [windowSize, setWindowSize] = useState<WindowProps>({ innerWidth: 0, innerHeight: 0 })
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ innerHeight: window.innerHeight, innerWidth: window.innerWidth })
    }
  }, [])
  const pathName = usePathname();

  const routes = (authRoutes.includes(pathName)) ? [] : [
    {
      href: `/home`,
      lable: "Trang Chủ",
      active: pathName === `/home`,
    },

    {
      href: `/service`,
      lable: "Dịch vụ",
      active: pathName === `/service`,
    },
    {
      href: `/staff`,
      lable: "Đội ngũ Nhân Viên",
      active: pathName === `/staff`,
    },
    {
      href: `/about-us`,
      lable: "Về Chúng Tôi",
      active: pathName === `/about-us`,
    },
    {
      href: `/booking`,
      lable: "Đặt lịch",
      active: pathName === `/booking`,
    },
  ];

  return (
    <div>
      <div className="flex h-20 items-center xl:pr-20 pr-4 pl-4 justify-around border-b w-screen fixed z-50 dark:bg-gray-800/80 dark:backdrop-blur-sm  bg-white/80 backdrop-blur-sm ">
        {user?.role?.toLowerCase() == "user" && <div className="lg:hidden">
          <AlignJustifyIcon onClick={() => {
            setIsOpen(true);
          }} />
        </div>
        }
        <div onClick={() => router.push("/")} className="cursor-pointer">

          <img src={LogoSmall.src} alt="logo" className="xl:hidden md:block hidden xl:w-16 w-12" />

          <Image className="xl:block hidden" src={logo} alt="logo" height={logo.height} width={logo.width} />

        </div>
        {user?.role?.toLowerCase() == "user" && (
          <>
            <MainNav className="mx-6" />
            {
              isOpen && (
                <div className="fixed inset-0 z-50  bg-white w-screen h-screen">
                  <div className="relative w-[70px]">
                    <ThemeToggle />
                  </div>
                  <div className="flex flex-col mt-4 p-4">
                    <div className="flex justify-end mb-4">
                      <X onClick={() => setIsOpen(false)} />
                    </div>
                    <div
                      className="flex flex-col gap-4"
                    >
                      {routes.map((route) => (
                        <Link
                          key={route.href}
                          href={route.href}
                          className={cn(
                            "text-md font-medium transition-color hover:text-primary",
                            route.active
                              ? "text-black dark:text-white"
                              : "text-muted-foreground",
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {route.lable}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="relative flex justify-between ml-4 mt-4">
                    <Image src={logo} alt="logo" height={logo.height} width={logo.width} />
                  </div>
                </div>
              )
            }
          </>

        )}
        {user?.role?.toLowerCase() !== "user" && (
          <div className="w-[500px] mx-6"></div>
        )}
        {
          (user && !authRoutes.includes(pathName)) ? (
            <div className="flex items-center justify-center">
              <div className="hidden xl:block">
                <ThemeToggle />
              </div>
              <UserButton user={user} />
              <div className="mt-2">
                <UserNotification user={user} />
              </div>
              <div className="ml-2 mb-2">
                <LanguageSwitcher />
              </div>
            </div>
          ) : (
            <div>
              <Button variant="outline" onClick={() => router.push('/auth/signin')} className="font-semibold text-crusta mr-6  hover:bg-gray-100 hover:text-crusta">Đăng nhập</Button>
              <Button onClick={() => router.push('/auth/signup')} className="bg-crusta font-semibold hover:opacity-80 hover:bg-crusta ">Đăng ký</Button>
            </div>
          )
        }
      </div>

      <div className="h-20" />
    </div >
  );
};

export default Header;
