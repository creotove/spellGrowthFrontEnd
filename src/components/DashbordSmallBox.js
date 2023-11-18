import React from "react";

function DashbordSmallBox({ title, amount, percentage, color }) {
  return (
    <div className="rounded-xl bg-white py-3 mb-3 me-5 w-full sm:w-56 flex-1 h-full whitespace-nowrap px-3 md:h-24 text-center">
      <div className="">
        <div className="box-heading text-slate-400 text-sm">{title}</div>
        <div className="box-content text-2xl">{amount}</div>
        {title === "Upcoming" ? null : (
          <div className="inline-block">
            <div className={`box-badge boxes ${color} px-3 rounded-xl`}>
              {percentage} %
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashbordSmallBox;
