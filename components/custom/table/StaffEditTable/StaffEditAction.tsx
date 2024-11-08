import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useStaffPerRequestStore } from '@/app/store/useStaffPerRequestStore';
import { replaceStaffOnRequest } from '@/app/actions/request/ReplaceStaffOnRequest';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
type Props = {
  staffId: string,
}

export default function StaffEditAction({ staffId }: Props) {
  const [isSelected, setIsSelected] = useState(false);
  const selectedStaffId = useStaffPerRequestStore(state => state.selectedStaffId);
  const onSelectedStaffId = useStaffPerRequestStore(state => state.onSelectedStaffId)

  const params = useParams();
  const router = useRouter();


  useEffect(() => {
    setIsSelected(selectedStaffId.includes(staffId))
  }, [staffId])

  const handleClick = async (e: any) => {
    setIsSelected(prev => !prev)
    if (e) {
      const element = document.getElementById('target');
      const res = await replaceStaffOnRequest(
        {
          requestId: params.requestId.toString(),
          staffId: onSelectedStaffId,
          newStaffId: staffId,
        }
      )
      if (res.success) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }

      const event = new KeyboardEvent('keydown', {
        key: "Escape",
        bubbles: true,
        cancelable: true,
      });
      element.dispatchEvent(event);
      router.refresh();
    }

  }
  return (
    <div onClick={(e) => handleClick(e)} id='target' >
      <div className={cn('w-4 h-4 border-2 border-gray-400  rounded-full', isSelected ? 'hidden' : '')} />
      <div className={cn('w-4 h-4 border-2 border-orange-400 rounded-full flex items-center justify-center ', isSelected ? '' : 'hidden')}>
        <div className={cn('w-2 h-2 bg-orange-400 rounded-full', isSelected ? '' : 'hidden')}>
        </div>
      </div>
    </div>
  )
}
