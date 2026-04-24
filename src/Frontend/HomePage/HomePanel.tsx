import React from "react";
import NavBar from "../NavBar";
import { Link, useNavigate } from "react-router-dom";
import GlowingButton from "../Components/General/GlowingButton";

function HomePanel() {
  const navigate = useNavigate();
  return (
    <div className="relative h-full overflow-y-hidden w-full">
      <NavBar additionalClasses="bg-[#131313]"></NavBar>
      <img
        src="HomePagebg.png"
        alt=""
        className=" object-contain blur-xs w-full absolute top-0 left-0 z-0 opacity-40"
      />
      <main className="flex flex-col px-10 gap-10 h-full pt-10 w-130 z-10 relative justify-center">
        <section className="">
          <div className="bg-[#CAFD00] rounded-2xl text-[#4A5E00] text-xs w-fit px-5 tracking-tighter font-thin">
            ELITE PERFORMANCE PLATFORM
          </div>
          <h2 className="text-white text-8xl">
            EVOLVE <br />
            <span className="text-[#CAFD00]">BEYOND</span>
            <br /> LIMITS
          </h2>
          <p className="text-[#ADAAAA]">
            Data-driven protocols for those who demand elite results. Track,
            analyze, and transcend your peak performance.
          </p>
        </section>
        <GlowingButton
          outline={false}
          onClick={() => navigate("/login")}
          additionalClasses="text-[#516700]! w-50! h-15!"
        >
          GET STARTED
        </GlowingButton>
      </main>
    </div>
  );
}

export default HomePanel;
