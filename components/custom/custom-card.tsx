import Image from "next/image"

interface CustomCardProps {
  title: string,
  desc: string,
  img: {
    src: string,
    width: number,
    height: number
  }
}

export default function CustomCard(props: CustomCardProps) {
  return (
    <div className=" shadow-lg shadow-gray-400 min-h-[500px] rounded-[30px] text-center ">
      <Image src={props.img.src} height={props.img.height} width={props.img.width} alt={props.title} className="overflow-hidden rounded-3xl min-w-[260px] w-[100%] h-[260px] object-cover" />
      <h2 className="text-center text-2xl font-bold text-crusta mt-8 mb-4 ">{props.title}</h2>
      
      <p className="px-6">{props.desc}</p>
    </div>
  )

}
