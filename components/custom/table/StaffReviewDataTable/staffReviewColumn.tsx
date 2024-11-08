"use client";

import { ColumnDef } from "@tanstack/react-table";
import Id from "@/public/id.png";
import Service from "@/public/service.png";
import Message from "@/public/message.png";

import Image from "next/image";
import { Star } from "lucide-react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export type StaffReviewColumn = {
  id: string;
  date: string;
  customerAvatar: string;
  customerName: string;
  rate: string;
  feedback: string;
  serviceName: string;
};

export const staffReviewColumn: ColumnDef<StaffReviewColumn>[] = [
  {
    accessorKey: "feedback",
    enableGrouping: true,
    header: () => {
      return <div className="text-crusta "></div>;
    },
    cell: ({ row }) => {
      let arrayLength: number = +row.original.rate;
      let starArray = [];
      if (!arrayLength) {
        starArray = [];
      } else {
        starArray = new Array(arrayLength).fill(0);
      }
      const starFull = [1, 2, 3, 4, 5];

      return (
        <div className="flex ">
          <div className="ml-4 w-10/12">
            <div className="flex items-center mt-2">
              <Image
                src={Id.src}
                height={Id.height}
                width={Id.width}
                alt="Id"
              />
              <p className="ml-2">{row.original.id}</p>
            </div>
            <div className="flex items-center mt-2">
              <Image
                src={Service.src}
                height={Service.height}
                width={Service.width}
                alt="Service"
              />
              <p className="ml-2">{row.original.serviceName}</p>
            </div>
            <div className="flex items-center mt-2">
              <Image
                src={Message.src}
                height={Message.height}
                width={Message.width}
                alt="Message"
              />
              <p className="ml-2">{row.original.feedback}</p>
            </div>
            <p className="text-sm text-gray-600 mt-6">
              Ngày hoàn thành: {row.original.date}
            </p>
          </div>
          <div className="flex flex-col justify-between items-end w-full">
            <div className="flex items-center mb-2 relative">
              <div className="absolute left-[-120px] flex items-center text-crusta">
                {starFull.map((star, index) => (
                  <Star key={index} className="" />
                ))}
              </div>
              <div className="absolute left-[-120px] flex items-center">
                {starArray.map((star, index) => (
                  <div key={index} className="flex text-crusta">
                    <StarIcon className="w-6" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center mt-4">
              <Avatar>
                <AvatarImage src={row.original.customerAvatar} />
              </Avatar>
              <p className="ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
                {row.original.customerName}
              </p>
            </div>
          </div>
        </div>
      );
    },
  },
];
