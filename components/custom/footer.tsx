import Image from "next/image"
import logo from "@/public/assets/images/logo.svg fill.png"
import face from "@/public/assets/footer/face.png"
import intagram from "@/public/assets/footer/intagram.png"
import twiter from "@/public/assets/footer/twiter.png"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const Footer = () => {
  return (
    <footer className="bg-blue-gray-50 text-white h-[440px] pt-[58px] border-t">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-6">
          <div className="col-span-2">
            <div className="flex flex-col">
              <Image src={logo} alt="logo" height={logo.height} width={logo.width} />
              <p className="text-gray-600 w-[300px]">Hệ thống chuyên cung cấp dịch vụ dọn dẹp nhà cửa trực tuyến TCH</p>
            </div>
            <div className="flex gap-2 mt-[67px]">
              <div className="rounded-full w-7 h-7 flex justify-center items-center border-solid border-gray-300 border-[1px] cursor-pointer">
                <Image src={face} alt="logo" height={face.height} width={face.width} />
              </div>
              <div className="rounded-full w-7 h-7 flex justify-center items-center border-solid border-gray-300 border-[1px] cursor-pointer">
                <Image src={intagram} alt="logo" height={intagram.height} width={intagram.width} />
              </div>
              <div className="rounded-full w-7 h-7 flex justify-center items-center border-solid border-gray-300 border-[1px] cursor-pointer">
                <Image src={twiter} alt="logo" height={twiter.height} width={twiter.width} />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-[#FF6A28] text-base mb-4">Trang chủ</h3>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-gray-600 hover:font-semibold">Dịch vụ</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Đội ngũ nhân viên</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Về chúng tôi</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Đặt lịch</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Đăng ký/Đăng nhập</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#FF6A28] text-base mb-4">Dịch vụ</h3>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-gray-600 hover:font-semibold">Tổng Vệ Sinh</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Dọn Nhà Theo Ca Lẻ</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Diệt côn trùng</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Vệ Sinh Máy Lạnh</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Dọn Dẹp Văn Phòng</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#FF6A28] text-base mb-4">Đội ngũ nhân viên</h3>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-gray-600 hover:font-semibold">Chất lượng</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Uy tín</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Tận tâm</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Nhiệt tình</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Kinh nghiệm</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#FF6A28] text-base mb-4">Về chúng tôi</h3>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-gray-600 hover:font-semibold">Giải pháp thông minh</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Tiết Kiệm Thời Gian</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">Dịch Vụ Chất Lượng</a></li>
              <li><a href="#" className="text-gray-600 hover:font-semibold">An tâm, Tin Tưởng</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <div className="flex flex-col h-24 items-center justify-center gap-2  border-t border-[#E5E7EB]">
          <h4 className="text-gray-500 text-sm">© Copyright 2024, All Rights Reserved by TCH</h4>
        </div>
      </div>
    </footer>

  )
}

export default Footer
