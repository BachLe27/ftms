"use client";

import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { authRoutes } from "@/routes";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
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
    <div
      className={cn(
        "items-center space-x-4 mr-4 lg:space-x-6 lg:mr-6 hidden lg:flex",
        className,
      )}
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
        >
          {route.lable}
        </Link>
      ))}
    </div>
  );
}
