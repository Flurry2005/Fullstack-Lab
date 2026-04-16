import React from "react";

function Allsessions() {
  return (
    <div>
      <article className="w-80 h-100 rounded-2xl bg-[#131313] overflow-hidden relative">
        <span className="absolute top-3 left-3 bg-[#FF7441] rounded-2xl px-2 py-1 text-xs tracking-tighter font-black text-[#410F00]">
          NEXT SESSION
        </span>
        <div className="w-full h-52 absolute left-0 bg-linear-to-b from-black-100/20 to-[#131313]/90"></div>
        <img src="PlaceholderGym.png" alt="" className="mb-15" />
        <div className="px-5">
          <h2 className="text-white font-black tracking-tighter text-4xl absolute top-45">
            HYPERTROPHY PHASE
          </h2>
          <div className="flex items-center gap-10">
            <div className="flex">
              <img src="CalenderIcon.png" alt="" className="h-4 mr-2" />
              <p className="text-[#ADAAAA] text-xs">TOMORROW</p>
            </div>
            <div className="flex">
              <img src="ClockIcon.png" alt="" className="h-4 mr-2" />
              <p className="text-[#ADAAAA] text-xs">06:30 AM</p>
            </div>
          </div>
          <article className="bg-[#1A1A1A] w-full h-20 rounded-3xl relative mt-5 overflow-hidden p-6 flex gap-6 justify-between items-center">
            <span className="w-full h-20 absolute left-0 top-0 border-[#F3FFCA] border-l-4"></span>
            <div>
              <p className="text-[#ADAAAA] text-xs">FOCUS</p>
              <h2 className="text-white">Chest & Triceps</h2>
            </div>
            <img
              src="RightArrowIcon.png"
              alt=""
              className="h-4 w-auto aspect-square object-contain"
            />
          </article>
        </div>
      </article>
    </div>
  );
}

export default Allsessions;
