"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import { Clock, Map, MapPin, User } from 'lucide-react'
import Link from 'next/link'
import { ScheduleInputType } from '@/type/schedule'
import { format } from 'date-fns'
import CustomButton from './button/CustomButton'
import DoneRequestAction from '@/app/actions/request/DoneRequestAction'
import toast from 'react-hot-toast'
import { createNotification } from '@/app/actions/notifications/create'
import { io } from "socket.io-client";
import { useSession } from 'next-auth/react'


interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
  date: string;
}

type EventType = {
  id: string
  title: string;
  start: Date | string;
  end: Date | string;
}




export default function ScheduleTable({ props }: { props: ScheduleInputType[] }) {
  const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
  const [eventsInput, setEventsInput] = useState<EventType[]>([])
  const [allEvents, setAllEvents] = useState<Event[]>([
  ])
  const [currentEvent, setCurrentEvent] = useState<ScheduleInputType>(null)
  const [showModal, setShowModal] = useState(false)
  const [showDetailModal, setViewDetailModal] = useState(false)
  const [idDetail, setIdDetail] = useState<number | null>(null)
  const [dateString, setDateString] = useState("")
  const calendarRef = useRef(null)
  const [currentData, setCurrentData] = useState(null);
  const session = useSession();

  async function handleDoneRequest(userId: string) {
    console.log(userId)

    const response = await DoneRequestAction({ requestId: idDetail })
    if (response.success) {
      toast.success(response.message)
      sendNotification({ staffId: session?.data?.user?.id, userId: userId })
      window?.location?.reload()
    } else {
      toast.error(response.message)
    }

    handleCloseModal()
  }

  const sendNotification = async ({ userId, staffId }: { userId: string | null, staffId: string | null }) => {
    try {
      if (userId) {
        await createNotification(userId, "complete_booking", "Yêu cầu dịch vụ của bạn đã được hoàn thành");
        socket.emit("notifyUser", userId, "Dịch vụ đã bị hủy bới người đặt");
      }
      if (staffId) {
        await createNotification(staffId, "complete_booking", "Yêu cầu dịch vụ của bạn đã được hoàn thành");
        socket.emit("notifyUser", staffId, "Công việc đã được hoàn thành");
      }
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  };



  useEffect(() => {
    const newEvents: EventType[] = []

    props.map(prop => {
      const dateString = format(prop.date, "yyyy/MM/dd")
      const dateArray = dateString.split('/')
      const startTimeArray = prop.startTime.split(':');
      const endTimeArray = prop.endTime.split(':');
      const eventStartTime = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2], +startTimeArray[0], +startTimeArray[1])
      const eventEndTime = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2], +endTimeArray[0], +endTimeArray[1])
      newEvents.push({ id: prop.id, title: prop.serviceCombo, start: eventStartTime, end: eventEndTime })
    })
    setEventsInput(newEvents)
    document.getElementsByClassName('fc-dayGridMonth-button')[0].innerHTML = "Tháng/"
    document.getElementsByClassName('fc-timeGridWeek-button')[0].innerHTML = "Tuần/"
    console.log(document.getElementsByClassName('fc-dayGridMonth-button'))
    Array.from(document.getElementsByClassName('fc-event-time')).forEach(e => {
      if (!e.innerHTML.includes(":")) {
        // e.innerHTML += `:00`
      }
    })
  }, [])


  function handleViewDetailModal({ data }: { data: any }) {
    setViewDetailModal(true)
    setIdDetail(data.event._def.publicId)
    setCurrentEvent(props.find(prop => prop.id === data.event._def.publicId))
    if (currentEvent?.date) {
      setDateString(format(currentEvent?.date, "dd/MM/yyyy"))
    }
    setCurrentData(data?.event._def)
  }

  function handleCloseModal() {
    setShowModal(false)
    setViewDetailModal(false)
    setIdDetail(null)
  }


  function goNext() {
    //@ts-ignore
    const calendarApi = calendarRef?.current?.getApi()
    console.log(calendarRef)
    // calendarApi.next()
  }

  return (
    <>
      <main className="flex flex-col items-center justify-between p-12 ">
        <div className="w-full ">
          <FullCalendar
            height={750}
            ref={calendarRef}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin
            ]}
            headerToolbar={{
              start: 'prev,next',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek'
            }}
            events={eventsInput as EventSourceInput}
            nowIndicator={true}
            // slotMinTime={'07:00:00'}
            // slotMaxTime={'22:00:00'}
            slotDuration={'00:30:00'}
            editable={false}
            droppable={true}
            selectable={true}
            selectMirror={true}
            eventClick={(data) => { handleViewDetailModal({ data: data }) }}
            titleFormat={{ year: 'numeric', month: 'numeric', day: 'numeric' }}
            locale={'vi'}
          />
        </div>

        <Transition.Root show={
          showDetailModal
        } as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setViewDetailModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h2" className="text-xl text-crusta font-semibold leading-6 ">
                            {currentEvent?.id}
                          </Dialog.Title>
                          <div className="mt-2">
                            <div className="mt-2">
                              <div className="text-gray-500 ">
                                <span className='text-crusta mr-2 font-semibold flex items-center'>
                                  <User className='w-[15px]' />

                                  <p className='mr-2 ml-1'>
                                    Thông tin khách hàng
                                  </p>
                                </span>
                                <div className=' flex my-4 items-center'>
                                  <img className='rounded-full object-cover w-20 h-20 mr-4' src={currentEvent?.user?.avatar} />
                                  <div>
                                    <span className='text-crusta mr-2 font-semibold flex items-center'>
                                      Họ và tên:
                                    </span>
                                    <p>{currentEvent?.user.name}</p>
                                    <span className='text-crusta mr-2 font-semibold flex items-center'>
                                      Số điện thoại
                                    </span>
                                    <p>{currentEvent?.phone}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>

                          <div className="mt-2">
                            <div className="text-gray-500">
                              <span className='text-crusta mr-2 font-semibold flex items-center'>
                                <MapPin className='w-[15px]' />
                                <p className='mr-2 ml-1'>
                                  Địa chỉ
                                </p>
                              </span>
                              {currentEvent?.address}
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="text-gray-500">
                              <span className='text-crusta mr-2 font-semibold flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hourglass-split" viewBox="0 0 16 16">
                                  <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                                </svg>
                                Thời lượng và diện tích làm việc                              </span>
                              {currentEvent?.serviceCombo}
                              {currentEvent?.serviceComboTitle}
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="text-gray-500">
                              <span className='text-crusta mr-2 font-semibold flex items-center'>
                                <Clock className='w-[15px]' />
                                <p className='mr-2 ml-1'>
                                  Thời gian
                                </p>
                              </span>
                              {
                                `${dateString} - Bắt đầu từ ${currentEvent?.startTime}`
                              }
                            </div>
                          </div>

                          {currentEvent?.googleMapLink &&
                            <div className="mt-2">
                              <div className="text-gray-500">
                                <span className='text-crusta mr-2 font-semibold flex items-center'>
                                  <Map className='w-[15px]' />
                                  <p className='mr-2 ml-1'>
                                    Link Google Map
                                  </p>
                                </span>
                                <Link className='text-blue-500 underline hover:text-blue-700' href={currentEvent?.googleMapLink}>{currentEvent?.googleMapLink}</Link>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      {
                        new Date(currentEvent?.date) < new Date(Date.now()) && (
                          <CustomButton text='Hoàn thành ' onClick={() => handleDoneRequest(currentEvent?.user?.id)} variant='smoosh' />
                        )
                      }
                      <div className='mx-2'>
                        <CustomButton text='Đóng' onClick={handleCloseModal} className='' />
                      </div>

                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main >
    </>
  )
}

