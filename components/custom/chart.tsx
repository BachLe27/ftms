"use client";
import dynamic from "next/dynamic";
import useSWR from "swr";
import "chart.js/auto";

const Pie = dynamic(() => import("react-chartjs-2").then((mod) => mod.Pie), {
  ssr: false,
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PieChart = () => {
  const { data, error } = useSWR("/api/staff/rating", fetcher);

  if (error) return <div className="h-[20vh] w-full flex justify-center items-center font-semibold text-lg text-center text-slate-500">Failed to load chart data</div>;
  if (!data) return <div className="h-[20vh] w-full flex justify-center items-center font-semibold text-lg text-center text-slate-500">Loading...</div>;

  if (data.message === "null") {
    return <div className="h-[20vh] w-full flex justify-center items-center font-semibold text-lg text-center text-slate-500">Hiện chưa có đánh giá nào</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-[250px]">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChart;
