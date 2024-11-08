"use client";

import * as React from "react";
import { CircleCheck, LocateIcon, MapPin, Star, TriangleAlert, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { StarIcon } from "@heroicons/react/20/solid";
import { useStaffStore } from "@/app/store/useSelectedStaff";
import { cn } from "@/lib/utils";



const data = [
  {
    id: "1",
    staffName: "Alice Johnson",
    staffAvatar: "",
    distance: "2 miles",
    credibility: "4",
    age: "20"
  },
];
export type staffSelectType = {
  id: string;
  staffName: string;
  staffAvatar: string;
  distance: string;
  credibility: string;
  age: string;
  address?: string;
  skills?: string[];
}


export function StaffMultiSelect({ data, staffNum }: { data: staffSelectType[], staffNum: number }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<staffSelectType[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [onDetailInfo, setOnDetailInfo] = React.useState<boolean[]>([])
  const { selectedList, setSelectedList } = useStaffStore();
  const [selectMessage, setSelectMessage] = React.useState<string>('');
  React.useEffect(() => {
    if (selected.length != staffNum) {
      setSelectMessage(`Hãy chọn đủ ${staffNum} nhân viên`)
    } else {
      setSelectMessage(`Đã chọn đủ số lượng nhân viên`)
    }

    setSelectedList(selected)
  }, [selected])

  //init OnDetailInfo
  React.useEffect(() => {
    let a: boolean[] = [];
    data.map(e => {
      a.push(false)
    })
    setOnDetailInfo(a)
  }, [])




  const handleUnselect = React.useCallback((data: staffSelectType) => {
    setSelected((prev) => prev?.filter((s) => s.id !== data.id));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = data?.filter(
    (item) => !selected.includes(item)
  );


  const handleOnHover = (index: number) => {
    const newSelectedArray = [...onDetailInfo]
    newSelectedArray[index] = true
    setOnDetailInfo(newSelectedArray)
  }

  const handleOutHover = (index: number) => {
    const newSelectedArray = [...onDetailInfo]
    newSelectedArray[index] = false
    setOnDetailInfo(newSelectedArray)
  }



  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className={cn("p-3 flex items-center rounded-lg w-full  mb-2", selectMessage.includes(staffNum.toString()) ? "bg-yellow-100/30" : "bg-green-100/30")}>
        {
          selectMessage.includes(staffNum.toString()) ? (
            <TriangleAlert className={cn("w-6 ml-3 mr-2", selectMessage.includes(staffNum.toString()) ? "text-yellow-600" : "text-green-600 ")} />
          ) : (

            <CircleCheck className={cn("w-6 ml-3 mr-2", selectMessage.includes(staffNum.toString()) ? "text-yellow-600" : "text-green-600 ")} />
          )
        }

        <p className={cn(selectMessage.includes(staffNum.toString()) ? "text-yellow-600" : "text-green-600")}>
          {selectMessage}
        </p>
      </div>
      <div className="group rounded-md border border-input border-gray-600 px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((item) => {
            return (
              <CommandList key={item.id} className="relative">
                <div className="flex border rounded-md py-2 px-4 shadow-lg ">
                  <div className="flex items-center justify-center">
                    <Avatar>
                      <AvatarImage src={item.staffAvatar} />
                      <AvatarFallback>{item.staffName}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold ml-4">
                      {item.staffName}
                    </p>
                  </div>
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
              </CommandList>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="chọn nhân viên..."
            className="ml-2 flex-1 bg-transparent outline-none border-crusta p-4 placeholder:text-muted-foreground"

          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables?.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full ">
                {selectables.map((item, index) => {
                  let arrayLength: number = Math.floor(+item.credibility)
                  let starArray = []
                  if (!arrayLength) {
                    starArray = []
                  } else {
                    starArray = new Array(arrayLength)
                    for (let i = 0; i < arrayLength; i++) {
                      starArray.push(i)
                    }
                  }
                  const starFull = [1, 2, 3, 4, 5]
                  return (
                    <div key={item.id} >
                      <div className={cn(!onDetailInfo[index] && "relative hidden z-50 ")}>
                        <div className={cn("absolute w-[300px] min-h-[300px] py-4 bg-white/95 border shadow-lg backdrop-blur rounded-lg bottom-0 z-50 flex flex-col items-center mt-8 right-[-300px]")}>
                          <div className="flex flex-col items-center justify-center">
                            <Avatar className="w-[80px] h-[80px] mt-8">
                              <AvatarImage src={item.staffAvatar} />
                              <AvatarFallback>{item.staffName}</AvatarFallback>
                            </Avatar>
                            <div className="mt-2">
                              <p className="font-semibold text-center">
                                {item.staffName}
                              </p>
                              {
                                +item.age > 0 &&
                                <p className="text-gray-600 text-sm text-center">
                                  {item.age} tuổi
                                </p>
                              }
                            </div>
                          </div>
                          <div className="relative mt-8">
                            <div className="flex items-start absolute left-[-60px] bottom-[-10px] text-crusta">
                              {starFull.map((index) => (
                                <div key={index}>
                                  <Star className="" />
                                </div>
                              ))}
                            </div>
                            <div className="flex items-start absolute bottom-[-10px] left-[-60px] ">
                              {
                                starArray.map((star, index) => (
                                  <div key={index} className="flex text-crusta">
                                    <StarIcon className="w-6" />
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                          <div className="mt-4 mx-10 text-center text-sm text-gray-400">{item.address}</div>
                          <span className="text-gray-800 ">Kỹ năng</span>
                          <ul className="mt-1 text-sm text-gray-600 list-disc"> {item.skills.map((e, i) => (<li key={i}>{e}</li>))}</ul>
                        </div>


                      </div>
                      <CommandItem
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(value) => {
                          setInputValue("");
                          console.log(item)
                          if (selected.length < staffNum) {
                            setSelected((prev) => [...prev, item]);
                          }

                        }}
                        className={"cursor-pointer"}
                      >
                        <div key={item.id} className="flex rounded-md w-full py-2 px-4 " onMouseEnter={() => handleOnHover(index)} onMouseLeave={() => { handleOutHover(index) }}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex w-5/12">
                              <Avatar>
                                <AvatarImage src={item.staffAvatar} />
                                <AvatarFallback>{item.staffName}</AvatarFallback>
                              </Avatar>
                              <div className="ml-4">
                                <p className="font-semibold ">
                                  {item.staffName}
                                </p>
                                {
                                  +item.age > 0 &&
                                  <p className="text-gray-600 text-sm">
                                    {item.age} tuổi
                                  </p>
                                }
                              </div>
                            </div>
                            <div className="w-5/12">
                              <div className="relative ">
                                <div className="flex items-start absolute  left-0 bottom-[-10px] text-crusta">
                                  {starFull.map((index) => (
                                    <div key={index}>
                                      <Star className="" />

                                    </div>
                                  ))}
                                </div>
                                <div className="flex items-start absolute bottom-[-10px] left-0 ">
                                  {
                                    starArray.map((star, index) => (
                                      <div key={index} className="flex text-crusta">
                                        <StarIcon className="w-6" />
                                      </div>
                                    ))
                                  }
                                </div>
                              </div>
                            </div>
                            {
                              (+item.distance !== -1 && item?.distance != undefined) ? (
                                <span className="flex items-center w-[100px]">
                                  <MapPin className="text-crusta w-[14px]" />
                                  <p className="text-gray-600 text-sm ml-1 min-w-[70px]">
                                    {item.distance} km
                                  </p>
                                </span>
                              ) : (<div className="w-[70px]" />)
                            }
                          </div>
                        </div>
                      </CommandItem>
                    </div>

                  )
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}

