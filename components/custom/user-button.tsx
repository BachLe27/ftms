"use client";

import { Session } from "next-auth";
import React, { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { History, LogOut, UserRound } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";


const UserButton = ({ user }: { user: Session['user'] }) => {
  const session = useSession();

  const routes = session?.data?.user?.role == "user" ?
    [
      {
        href: `/profile/user`,
        lable: "Tài khoản",
        icon: UserRound

      },
      {
        href: `/profile/booking-history`,
        lable: "Lịch sử đặt lịch",
        icon: History
      },

      {
        href: `/auth/signout`,
        lable: "Đăng xuất",
        icon: LogOut
      },

    ] :
    [
      {
        href: `/profile/user`,
        lable: "Tài khoản",
        icon: UserRound

      },
      {
        href: `/auth/signout`,
        lable: "Đăng xuất",
        icon: LogOut
      },
    ]


  const router = useRouter();
  if (user != undefined) {
    const userName: string = user.name.toString();
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex p-2 rounded-md">
            <Avatar className="mr-3">
              <AvatarImage src={user?.image} className="object-cover" />
            </Avatar>
            <div className="hidden md:block">
              <p className="text-start">{user?.name}</p>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72">
          {routes.map(route => {
            const Icon = route.icon;
            return (
              <DropdownMenuItem key={route.lable} className="pl-2 py-2" onClick={() => router.push(`${route.href}`)}>
                <div className="flex items-end">
                  <Icon />
                  <p className="ml-2">
                    {route.lable}
                  </p>
                </div>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
