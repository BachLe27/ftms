"use client"

import { DistrictProps, ProvinceProps, WardProps } from "@/app/(user)/booking/component/bookingForm";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useRef, useState, useTransition } from "react"; 
import { Button } from "../ui/button";
import { getAllDistricts, getAllProvinces, getAllWards } from "@/app/actions/location/get";
import { deleteAddressAction, updateAddressAction } from "@/app/actions/profile/update-profile";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type AddressesProps = {
  addresses: {
    address: {
      id: string,
      province: {
        id: number,
        provinceName: string
      };
      district: {
        id: number
        districtName: string
      };
      ward: {
        id: number
        wardName: string
      };
      specificAddress: string
      isDefault: boolean
    }
  }[]
}

export default function AddressForm(props: AddressesProps) {
  const [isPending, startTransition] = useTransition();
  const [address, setAddress] = useState<typeof props.addresses>(props.addresses ? props.addresses : []);
  const [onEdit, setOnEdit] = useState<number | null>(null);
  const [provinces, setProvinces] = useState<ProvinceProps[]>([]);
  const [currentUpdateIndex, setCurrentUpdateIndex] = useState<number | null>(null);
  const [districts, setDistricts] = useState<DistrictProps[][]>([]);
  const [wards, setWards] = useState<WardProps[][]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const firstUpdate = useRef(true);

  useEffect(() => {
    const fetchProvinces = async () => {
      const _provinces = await getAllProvinces();
      setProvinces(_provinces);
    }

    const fetchDistrictsAndWards = async () => {
      let districtsArray: DistrictProps[][] = [];
      let wardsArray: WardProps[][] = [];
      
      for (let index = 0; index < address.length; index++) {
        const element = address[index];
        const _districts = await getAllDistricts(element.address.province.id);
        districtsArray[index] = _districts;

        const _wards = await getAllWards(element.address.district.id);
        wardsArray[index] = _wards;
      }

      setDistricts(districtsArray);
      setWards(wardsArray);
    }

    fetchProvinces();
    fetchDistrictsAndWards();
  }, [address]);

  const getCurrentProvinceId = (provinceName: string) => {
    const result = provinces?.filter(e => e.provinceName == provinceName)
    if (result !== undefined && result.length > 0) return result[0]?.id;
  }

  const getCurrentDistrictId = (districtName: string, index: number) => {
    const result = districts[index]?.filter(e => e.districtName == districtName)
    if (result !== undefined && result.length > 0) return result[0].id;
  }

  const getCurrentWardId = (wardName: string, index: number) => {
    const result = wards[index]?.filter(e => e.wardName == wardName)
    if (result !== undefined && result.length > 0) return result[0].id;
  }

  const handleProvinceChange = (e: string, index: number) => {
    let newAddress = [...address];
    newAddress[index].address.province.id = getCurrentProvinceId(e);
    newAddress[index].address.province.provinceName = e;

    newAddress[index].address.district.id = 0;
    newAddress[index].address.district.districtName = '';
    newAddress[index].address.ward.id = 0;
    newAddress[index].address.ward.wardName = '';

    setAddress(newAddress);
    setCurrentUpdateIndex(index);
    updateDistrictAndWard(index, newAddress[index].address.province.id);
  }

  const handleDistrictChange = (e: string, index: number) => {
    let newAddress = [...address];
    newAddress[index].address.district.id = getCurrentDistrictId(e, index);
    newAddress[index].address.district.districtName = e;

    newAddress[index].address.ward.id = 0;
    newAddress[index].address.ward.wardName = '';

    setAddress(newAddress);
    setCurrentUpdateIndex(index);
    updateWard(index, newAddress[index].address.district.id);
  }

  const handleWardChange = (e: string, index: number) => {
    let newAddress = [...address];
    newAddress[index].address.ward.id = +getCurrentWardId(e, index);
    newAddress[index].address.ward.wardName = e;

    setAddress(newAddress);
    setCurrentUpdateIndex(index);
  }

  const updateDistrictAndWard = async (index: number, provinceId: number) => {
    if (provinceId) {
      const _districts = await getAllDistricts(provinceId);
      const districtArray = [...districts];
      districtArray[index] = _districts;
      setDistricts(districtArray);

      if (_districts.length > 0) {
        const _wards = await getAllWards(_districts[0].id);
        const wardArray = [...wards];
        wardArray[index] = _wards;
        setWards(wardArray);
      }
    }
  }

  const updateWard = async (index: number, districtId: number) => {
    if (districtId) {
      const _wards = await getAllWards(districtId);
      const wardArray = [...wards];
      wardArray[index] = _wards;
      setWards(wardArray);
    }
  }

  const handleDelete = async (index: number) => {
    const addressId = address[index].address.id; 

    const data = await deleteAddressAction(addressId);
    if (data?.error) {
      toast.error(data?.error);
    }
    if (data?.success) {
      toast.success(data?.success);
      let newAddress = [...address];
      newAddress.splice(index, 1); 
      setAddress(newAddress);
      if (newAddress.length == 0) {
        window.location.reload();
      }
    }
  }

  const handleSubmit = async (values: any) => {
    values.preventDefault();
    setError("")
    setSuccess("")

    startTransition(async () => {
      const data = await updateAddressAction(address)
      router.refresh();
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
      }
    })
  };

  return (
    <div className="mb-4">
      {address.length > 0 && address?.map((ad, index) => {
        return (
          <div key={index} className="">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="flex mt-8">
                  <p className="text-lg font-semibold text-neutral-600 ">
                    {ad?.address.specificAddress}, {ad?.address.ward.wardName}, {ad?.address.district.districtName}, {ad?.address.province?.provinceName}
                    {ad.address.isDefault && <span className="text-sm font-semibold text-blue-600"> (Địa chỉ mặc định)</span>}
                  </p>
                  <div>
                    <span onClick={() => {
                      if (onEdit !== index) {
                        setOnEdit(index);
                      }
                    }}
                      className="text-[12px] mb-1 font-semibold text-blue-600 ml-2 hover:text-blue-800 hover:cursor-pointer inline-block">Chỉnh sửa</span>
                    <span onClick={() => handleDelete(index)}
                      className="text-[12px] mb-1 font-semibold text-red-600 ml-2 hover:text-red-800 hover:cursor-pointer inline-block">Xóa</span>
                  </div>
                </div>

                <div className={cn("grid grid-cols-3 gap-4", onEdit !== index ? 'hidden' : '')}>
                  <div className="border border-orange-400 rounded-md text-gray-500">
                    <Select 
                      onValueChange={(e) => handleProvinceChange(e, index)} 
                      defaultValue={ad?.address.province?.provinceName}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tỉnh nơi bạn sống" />
                      </SelectTrigger>
                      <SelectContent className="">
                        {provinces?.map((e) => (
                          <SelectItem value={e.provinceName} key={e.id}>{e.provinceName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="border border-orange-400 rounded-md text-gray-500">
                  <Select 
                      onValueChange={(e) => handleDistrictChange(e, index)} 
                      defaultValue={ad?.address.district?.districtName} 
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn Thành phố/Huyện nơi bạn sống" />
                      </SelectTrigger>
                      <SelectContent className="">
                        {districts?.[index]?.map((e) => (
                          <SelectItem value={e.districtName} key={e.id}>{e.districtName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="border border-orange-400 rounded-md text-gray-500">
                    <Select 
                      onValueChange={(e) => handleWardChange(e, index)} 
                      defaultValue={ad?.address.ward?.wardName} 
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn Phường/Xã nơi bạn sống" />
                      </SelectTrigger>
                      <SelectContent className="">
                        {wards?.[index]?.map((e) => (
                          <SelectItem value={e.wardName} key={e.id}>{e.wardName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <input 
                    onChange={(e) => {
                      let newAddress = [...address];
                      newAddress[index].address.specificAddress = e.target.value;
                      setAddress(newAddress)
                    }}
                    key={index}
                    className={cn('col-span-4 mb-3 border border-crusta p-2 mr-4 rounded-md', onEdit !== index ? 'hidden' : 'block')}
                    value={`${ad.address?.specificAddress}`} 
                  />
                </div>
              </div>

              <Button 
                disabled={isPending} 
                variant="ghost" 
                className={cn("bg-crusta text-white font-semibold", onEdit !== index ? 'hidden' : 'inline-block')} 
                type="submit"
              >
                Lưu
              </Button>
            </form>
          </div>
        )
      })}
    </div>
  )
}
