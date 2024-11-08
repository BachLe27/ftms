"use client";

import { Session } from "next-auth";
import React, { FC, useEffect, useState } from "react";
import {
  getNotificationsByType,
  getNotificationsByUserId,
} from "@/app/actions/notifications/get";
import { getAllNotificationsByUserId } from "@/app/actions/notifications/get";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircle,
  Ban,
  Bell,
  CircleCheck,
  CircleCheckBig,
  Dot,
  MailCheck,
} from "lucide-react";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";
import { updateNotification } from "@/app/actions/notifications/markAsRead";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import CustomButton from "./button/CustomButton";

let socket: Socket | null = null;

const UserNotification = ({ user }: { user: Session["user"] }) => {
  const [notiTitle, setNotiTitle] = useState([
    { notiTitle: "Tất cả", isSelected: true },
    { notiTitle: "Chưa đọc", isSelected: false },
  ]);

  const [isReadAll, setIsReadAll] = useState(false);
  const handleReadAllNotifications = async () => {
    await updateNotification(user.id);
    setNotReadNotification([]);
    setNumber(0);
    const newNotiArray = [...all_notifications]
    newNotiArray.map(noti => {
      if (!noti.is_read) {
        noti.is_read = true;
      }
    })
    setIsReadAll(true)
    setAllNotification(newNotiArray)
  };

  const [not_read_notifications, setNotReadNotification] = useState([]);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
    }

    socket.on("connect", () => {
      socket.emit("registerUser", user.id);
    });

    socket.on("notifyUser", (message) => {
      toast(message);
      setNumber((prevNumber) => prevNumber + 1);
    });

    socket.on("disconnect", () => { });

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
      socket?.disconnect();
      socket = null;
    };
  }, [user?.id]);

  useEffect(() => {
    const fetchData = async () => {
      setNotReadNotification(await getNotificationsByUserId(user.id, false));
    };
    fetchData();
  }, [number, user?.id]);

  const [all_notifications, setAllNotification] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setAllNotification(await getAllNotificationsByUserId(user.id));
    };
    fetchData();
  }, [number, user?.id]);

  const handleChangeTitle = () => {
    const noti = [...notiTitle];
    noti[0].isSelected = !noti[0].isSelected;
    noti[1].isSelected = !noti[1].isSelected;
    setNotiTitle(noti);
    console.log(!isReadAll && notiTitle[0].isSelected)

  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="relative border-0 focus:ring-0">
          <div className="ml-3">
            <Bell />
          </div>

          {not_read_notifications.length > 0 && (
            <div className="text-white absolute -top-2 -right-1 bg-red-600 rounded-full text-xs px-1.5">
              {not_read_notifications.length}
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <div>
            <div className="w-[400px]">
              <div className="mt-4 mb-6 ml-2">
                <p className="text-[20px] font-bold my-4 ml-2">Thông báo</p>

                {notiTitle.map((noti, index) => (
                  <span
                    key={noti.notiTitle}
                    className={cn(
                      " rounded-3xl  cursor-pointer px-3 py-2 mr-2 font-semibold",
                      noti.isSelected
                        ? "text-slate-700 bg-slate-200"
                        : "text-slate-500 bg-white"
                    )}
                    onClick={handleChangeTitle}
                  >
                    {noti.notiTitle}
                  </span>
                ))}
                {notiTitle[0].isSelected && all_notifications.length == 0 && (
                  <div className="min-h-80 flex flex-col items-center text-gray-400 justify-center">
                    <p>Hiện tại không có thông báo</p>
                    <p>Hãy kiểm tra lại sau</p>
                  </div>
                )}

                {notiTitle[1].isSelected &&
                  not_read_notifications.length == 0 && (
                    <div className="min-h-80 flex flex-col items-center text-gray-400 justify-center">
                      <p>Hiện tại không có thông báo chưa đọc</p>
                      <p>Hãy kiểm tra lại sau</p>
                    </div>
                  )}
              </div>
            </div>

            {
              !(notiTitle[1].isSelected &&
                not_read_notifications.length == 0) &&
              <div className="min-h-80 max-h-80 overflow-y-auto">
                {all_notifications.slice(0, 10).map((notification, index) => {
                  let subjectText = "";
                  let subjectBgColor = "";
                  let subjectTextColor = "";
                  let subjectBorderColor = "";
                  let lineColor = "";

                  switch (notification.type) {
                    case "booking":
                      subjectText = "Thông báo yêu cầu đặt dịch vụ thành công";
                      subjectBgColor = "bg-green-100 hover:bg-green-200";
                      subjectTextColor = "text-green-700";
                      subjectBorderColor = "border-green-200";
                      lineColor = "bg-green-500";
                      break;
                    case "cancel_booking":
                      subjectText = "Thông báo yêu cầu hủy dịch vụ đã được chấp nhận ";
                      subjectBgColor = "bg-orange-100 hover:bg-orange-200";
                      subjectTextColor = "text-orange-700";
                      subjectBorderColor = "border-orange-200";
                      lineColor = "bg-orange-500";

                      break;
                    case "accept booking":
                      subjectText = "Thông báo yêu cầu đặt dịch vụ đã được xác nhận ";
                      subjectBgColor = "bg-blue-100 hover:bg-blue-200";
                      subjectTextColor = "text-blue-700";
                      subjectBorderColor = "border-blue-200";
                      lineColor = "bg-blue-500";
                      break;
                    case "deny booking":
                      subjectText = "Thông báo yêu cầu đặt dịch vụ đã bị từ chối ";
                      subjectBgColor = "bg-red-100 hover:bg-red-200";
                      subjectTextColor = "text-red-700";
                      subjectBorderColor = "border-red-200";
                      lineColor = "bg-red-500";

                      break;
                    case "complete_booking":
                      subjectText = "Thông báo yêu cầu đặt dịch vụ đã hoàn thành";
                      subjectBgColor = "bg-green-100 hover:bg-green-200";
                      subjectTextColor = "text-green-700";
                      subjectBorderColor = "border-green-200";
                      lineColor = "bg-green-500";

                      break;

                    default:
                      subjectText = "Thông báo";
                      subjectBgColor = "bg-gray-100 hover:bg-gray-200";
                      subjectTextColor = "text-gray-700";
                      subjectBorderColor = "border-gray-200";
                      lineColor = "bg-gray-500";
                  }
                  return (
                    <DropdownMenuItem
                      className={cn(
                        `pl-2 py-2 my-1 justify-between hover:cursor-pointer flex w-[400px] ${subjectBgColor} border ${subjectBorderColor}`,
                      )}
                      key={index}
                    >
                      <div
                        className={`absolute left-0 top-0 h-full w-1 ${lineColor} `}
                      ></div>
                      <div className="w-11/12 ml-2 flex items-center">
                        <div className=" mt-1">
                          {(notification.type === "booking" || notification.type == "complete_booking") && (
                            <div className="bg-green-500 text-white w-6 h-6 rounded-full mr-1">
                              <CircleCheck />
                            </div>
                          )}
                          {(notification.type === "cancel booking") && (
                            <div className="bg-red-500 text-white w-6 h-6 rounded-full ">
                              <CircleX />
                            </div>
                          )}
                          {notification.type === "accept booking" && (
                            <div className="bg-blue-500 text-white w-6 h-6 rounded-sm  ">
                              <MailCheck />
                            </div>
                          )}
                          {(notification.type === "deny booking") && (
                            <div className="bg-orange-500 text-white w-6 h-6 rounded-full ">
                              <Ban />
                            </div>
                          )}

                          {(notification.type === "cancel_booking") && (
                            <div className="bg-orange-500 text-white w-6 h-6 rounded-full ">
                              <AlertCircle />
                            </div>
                          )}


                        </div>
                        <div className="flex flex-col ml-3 ">
                          <div
                            className={`text-sm font-semibold ${subjectTextColor} `}
                          >
                            {subjectText}
                          </div>
                          <p className="">{notification.message}</p>
                        </div>
                      </div>
                      {!notification.is_read && (
                        <div>
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                          </span>
                        </div>
                      )}
                    </DropdownMenuItem>
                  );
                })}
              </div>
            }
          </div>
          <CustomButton
            className="text-blue-600 bg-slate-100 p-2 font-semibold "
            style={{ width: "100%" }}
            onClick={handleReadAllNotifications}
            text="Đánh dấu là đã đọc"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserNotification;
