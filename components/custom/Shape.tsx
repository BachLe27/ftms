import { cn } from "@/lib/utils"

export const CustomSquare = ({ className }: { className: string }) => {
  return (
    <div className={cn("z-10 w-40 h-40 bg-[#F47458] rounded-lg absolute", `${className}`)} />
  )
}

export const CustomCircle = ({ className }: { className: string }) => {
  return (
    <div className={cn("z-10 w-40 h-40 bg-gradient-to-b from-[#F2946200] to-[#F2946290] rounded-full absolute", `${className}`)} />
  )
}
export const AvatarBorder = ({ className }: { className: string }) => {
  return (
    <div className={cn("z-10 w-40 h-80 bg-gradient-to-b to-[#F2946200] from-[#F2946290] rounded-t-full absolute", `${className}`)} />
  )
}


