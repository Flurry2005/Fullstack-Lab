import React from "react";
import NavBar from "../../NavBar";

function DashboardPanel() {
  return (
    <div>
      <NavBar></NavBar>
      <main className="flex flex-col px-10 gap-10 h-full pt-10 w-full">
        <section className="flex justify-between mx-10 rounded-2xl overflow-hidden h-fit relative">
          <div className="w-full h-60 absolute border-b-4 left-0 bg-linear-to-b from-neutral-500/70 to-black/90 border-lime-600 rounded"></div>
          <h2 className="absolute left-10 top-25 text-white text-7xl font-black tracking-tighter">
            WELCOME BACK, CHAMP.
          </h2>
          <p className="absolute left-10 top-42 text-[#ADAAAA]">
            You've hit 85% of your weekly volume target. One more session to{" "}
            <br />
            peak performance.
          </p>
          <img
            src="./dashboardPicture.png"
            alt=""
            className="w-full h-60 aspect-square object-cover rounded-2xl"
          />
        </section>
        <section className="flex gap-10 mx-10 ">
          <article className="bg-[#131313] w-120 h-70 rounded-2xl justify-between p-6 flex flex-col gap-1">
            <h2 className="text-[#F3FFCA] font-extrabold text-xs">
              WEEKLY INTENSITY
            </h2>
            <div>
              <div className="flex items-end gap-2">
                <h2 className="text-3xl text-white font-extrabold">12.4K</h2>
                <p className="text-[#ADAAAA]">TOTAL KGs MOVED</p>
              </div>
            </div>
            <img src="volumePicture.png" alt="" className="w-100 self-center" />
          </article>
          <article className="bg-[#131313] w-80 h-60 rounded-3xl relative overflow-hidden p-6 flex flex-col gap-6">
            <span className="w-full h-full absolute left-0 top-0 border-[#FF7441] border-l-4"></span>
            <div className="flex justify-between">
              <img src="latestIcon.png" alt="" className="h-6" />
              <span className="text-[#FF7441] bg-[#FF7441]/10 px-2 py-1 flex justify-center items-center rounded-2xl text-xs font-bold">
                4h Ago
              </span>
            </div>
            <h2 className="text-white text-3xl font-black tracking-tighter leading-6 ">
              HEAVY PUSH SESSION
            </h2>
            <div className="flex justify-between">
              <p className="text-[#ADAAAA]">Duration</p>
              <p className="text-white">1h</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#ADAAAA]">Intensity</p>
              <p className="text-[#FF7441]">Elite</p>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default DashboardPanel;
