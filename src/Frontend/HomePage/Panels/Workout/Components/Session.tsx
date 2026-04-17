import React, { use, useEffect, useState } from "react";
import GlowingButton from "../../../../Components/General/GlowingButton";
import type { Session } from "../../../../types/Session";
import { updateSession } from "../Scripts/UpdateSession";

interface Props {
  session: Session;
  day: string;
  month: string;
  year: string;
  workoutName: string;
  tags: string[];
}

function Session({ session, day, month, year, workoutName, tags }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [sessionData, setSessionData] = useState<Session>(session);

  useEffect(() => {
    updateSession(sessionData);
  }, [sessionData]);

  return (
    <div className="bg-[#131313] p-5 rounded-2xl flex gap-5 flex-col">
      <section className=" flex gap-5 items-center h-35 w-full">
        <div className="flex flex-col text-white w-10 items-center">
          <p className="text-3xl font-black">{day}</p>
          <p className="text-xs text-[#ADAAAA]">{month.toUpperCase()}</p>
          <p className="text-xs text-[#ADAAAA]">{year}</p>
        </div>
        <span className="h-20 border-r-2 border-[#484847]/10 min-w-1"></span>
        <span
          className={`w-fit h-5 rounded-3xl tracking-tighter font-semibold px-2 py-4 text-center flex justify-center items-center ${sessionData.completed ? "bg-[#F3FFCA]/10 text-[#F3FFCA]" : "bg-[#FF7441]/10 text-[#FF7441]"}`}
        >
          {sessionData.completed ? "COMPLETED" : "NOT COMPLETED"}
        </span>
        <div>
          <p className="text-4xl text-white font-black tracking-tighter">
            {workoutName ?? "Unknown workout"}
          </p>
          <p className="text-xs text-[#ADAAAA]">Temporary</p>
        </div>
        {/*Tags */}
        <div className="flex flex-col justify-center items-end flex-1">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-[#1A1A1A] text-white rounded-3xl w-fit"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Expand */}
        <button
          className="bg-[#20201F] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer "
          onClick={() => setShowDetails((prev) => !prev)}
        >
          <img
            src="RightArrowIcon.png"
            alt=""
            className={`rotate-90 h-5 w-auto transition duration-300 ${
              showDetails && "-rotate-90!"
            }`}
          />
        </button>
      </section>
      {showDetails && (
        <div>
          <GlowingButton
            onClick={() => {
              setSessionData((prev) => ({
                ...prev,
                completed: !prev.completed,
              }));
            }}
            outline={false}
            additionalClasses="bg-none !bg-lime-400 rounded-2xl px-2 py-2 tracking-tighter font-black cursor-pointer text-black! w-40! text-xs!"
          >
            COMPLETE WORKOUT
          </GlowingButton>
        </div>
      )}
    </div>
  );
}

export default Session;
