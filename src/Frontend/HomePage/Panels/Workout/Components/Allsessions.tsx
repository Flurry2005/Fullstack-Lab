import React, { useEffect, useState } from "react";
import GlowingButton from "../../../../Components/General/GlowingButton";
import WorkoutSelector from "./WorkoutSelector";
import { getWorkouts } from "../Scripts/GetWorkouts";
import { getSessions } from "../Scripts/GetSessions";
import type { Workout } from "../../../../types/Workout";

function Allsessions() {
  const [workoutSelectorOpen, setWorkoutSelectorOpen] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const [sessions, setSessions] = useState([]);

  const openWorkoutSelector = async () => {
    const res = await getWorkouts();
    if (res.success) {
      setWorkouts(res.data);
      setWorkoutSelectorOpen((prev) => !prev);
    }
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const fetchSessions = async () => {
    const res1 = await getWorkouts();
    if (res1.success) {
      setWorkouts(res1.data);
    }
    const res = await getSessions();

    if (res.success) {
      setSessions(res.data);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="flex gap-10">
      <GlowingButton
        outline={false}
        onClick={() => openWorkoutSelector()}
        additionalClasses="rounded-full! w-15! h-15! text-black! text-7xl font-light! fixed right-10 bottom-10 cursor-pointer"
      >
        <img src="PlusIcon.png" alt="" />
      </GlowingButton>
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
      {/* Session Section */}
      <section className="flex-1 flex flex-col gap-5">
        {sessions.map((session: Session) => {
          const workout = workouts.find((w) => w._id === session.workoutId);
          const d = new Date(session.date);

          const day = d.getDate();
          const month = monthNames[d.getMonth()];
          return (
            <div className="bg-[#131313] p-5 rounded-2xl flex gap-5 items-center">
              <div className="flex flex-col text-white w-10 items-center">
                <p className="text-3xl font-black">{day}</p>
                <p className="text-xs text-[#ADAAAA]">{month.toUpperCase()}</p>
              </div>
              <span className="h-10 border-r-2 border-[#484847]/10 min-w-1"></span>
              <div>
                <p className="text-4xl text-white font-black tracking-tighter">
                  {workout?.workoutName ?? "Unknown workout"}
                </p>
                <p className="text-xs text-[#ADAAAA]">Temporary</p>
              </div>
              {/*Tags */}
              <div className="flex flex-col justify-center items-end flex-1">
                {workout?.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-[#1A1A1A] text-white rounded-3xl w-fit"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </section>
      {workoutSelectorOpen && (
        <WorkoutSelector
          updateSessions={fetchSessions}
          closeSelector={openWorkoutSelector}
          workouts={workouts}
        />
      )}
    </div>
  );
}

type Session = {
  _id: string;
  userId: string;
  workoutId: string;
  date: Date;
};

export default Allsessions;
