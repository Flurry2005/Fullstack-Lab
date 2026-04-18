import React, { useEffect, useState } from "react";
import GlowingButton from "../../../../Components/General/GlowingButton";
import WorkoutSelector from "./WorkoutSelector";
import { getWorkouts } from "../Scripts/GetWorkouts";
import { getSessions } from "../Scripts/GetSessions";
import type { Workout } from "../../../../types/Workout";
import SessionCard from "./SessionCard";
import type { Session } from "../../../../types/Session.ts";

function PastSessions() {
  const [workoutSelectorOpen, setWorkoutSelectorOpen] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const [sessions, setSessions] = useState<Session[]>([]);
  const [pastSessions, setPastSessions] = useState<Session[]>([]);

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
      const now = Date.now();

      const pastSessions = res.data
        .filter((session: Session) => new Date(session.date).getTime() < now)
        .sort(
          (a: Session, b: Session) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        ); // newest past first

      const futureSessions = res.data
        .filter((s: Session) => new Date(s.date).getTime() >= now)
        .sort(
          (a: Session, b: Session) =>
            new Date(a.date).getTime() - new Date(b.date).getTime(),
        ); // nearest future first

      setSessions(futureSessions);
      setPastSessions(pastSessions);
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
          PREVIOUS SESSION
        </span>
        <div className="w-full h-52 absolute left-0 bg-linear-to-b from-black-100/20 to-[#131313]/90"></div>
        <img src="PlaceholderGym.png" alt="" className="mb-15" />
        <div className="px-5">
          <h2 className="text-white font-black tracking-tighter text-4xl absolute top-45">
            {workouts.find(
              (workout) => workout._id === pastSessions[0]?.workoutId,
            )?.workoutName || "No Upcomming Session"}
          </h2>
          <div className="flex items-center gap-10">
            <div className="flex">
              <img src="CalenderIcon.png" alt="" className="h-4 mr-2" />
              <p className="text-[#ADAAAA] text-xs">
                {pastSessions.length > 0
                  ? (() => {
                      const now = new Date();
                      const sessionDate = new Date(pastSessions[0]?.date);

                      // Strip time (IMPORTANT)
                      const today = new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate(),
                      );
                      const target = new Date(
                        sessionDate.getFullYear(),
                        sessionDate.getMonth(),
                        sessionDate.getDate(),
                      );

                      const diffDays = Math.round(
                        (target.getTime() - today.getTime()) /
                          (1000 * 60 * 60 * 24),
                      );

                      if (diffDays === 0) return "TODAY";
                      if (diffDays === 1) return "TOMORROW";
                      if (diffDays > 1) return `IN ${diffDays} DAYS`;
                      if (diffDays === -1) return "YESTERDAY";

                      return `${Math.abs(diffDays)} DAYS AGO`;
                    })()
                  : "No Upcoming Session"}
              </p>
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
              <h2 className="text-white">
                {workouts.find(
                  (workout) => workout._id === sessions[0]?.workoutId,
                )?.tags || "No Upcomming Session"}
              </h2>
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
        {pastSessions.map((session: Session) => {
          const workout = workouts.find((w) => w._id === session.workoutId);
          const d = new Date(session.date);

          const day = d.getDate();
          const month = monthNames[d.getMonth()];
          const year = d.getFullYear();
          return (
            <SessionCard
              session={session}
              day={day.toString()}
              month={month}
              year={year.toString()}
              workout={workout!}
              tags={workout?.tags!}
            />
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

export default PastSessions;
