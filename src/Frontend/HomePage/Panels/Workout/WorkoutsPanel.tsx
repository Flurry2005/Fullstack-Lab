import NavBar from "../../../NavBar";
import GlowingButton from "../../../Components/General/GlowingButton";
import { useEffect, useMemo, useState, type JSX } from "react";
import UpcommingSessions from "./Components/UpcommingSessions";
import CreateWorkout from "./Components/Create/CreateWorkout";
import PastSessions from "./Components/PastSessions";
import { getExercices } from "./Scripts/GetExercices";
import type { Exercice } from "../../../types/Exercice";
import type { Session } from "../../../types/Session";
import { getSessions } from "./Scripts/GetSessions";
import { getWorkouts } from "./Scripts/GetWorkouts";
import type { Workout } from "../../../types/Workout";
import { useSessions } from "../../../Context/useSessions";
import { useAuth } from "../../../Context/useAuth";

export const Panel = {
  PAST: "PAST",
  UPCOMMING: "UPCOMMING",
  CREATE: "CREATE",
} as const;

export type ActivePanel = (typeof Panel)[keyof typeof Panel];

function WorkoutsPanel() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(Panel.UPCOMMING);

  const [exercices, setExercices] = useState<Exercice[] | undefined>(undefined);
  const { sessions, setSessions } = useSessions();

  const { logout } = useAuth();

  const { futureSessions, pastSessions } = useMemo(() => {
    const future: Session[] = [];
    const past: Session[] = [];

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    if (sessions === undefined)
      return {
        futureSessions: undefined,
        pastSessions: undefined,
      };

    for (const s of sessions) {
      const date = new Date(s.date);
      const isPast = s.completed || date < startOfToday;

      (isPast ? past : future).push(s);
    }
    console.log("Recomputing", future);
    return {
      futureSessions: future.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
      pastSessions: past.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    };
  }, [sessions]);

  const [workouts, setWorkouts] = useState<Workout[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const res1 = await getWorkouts();
      if (res1.success) {
        setWorkouts(res1.data);
      } else {
        logout();
      }

      const res = await getExercices();
      setExercices(res.data);
    })();
  }, []);

  const fetchSessions = async () => {
    const res = await getSessions();

    if (!res.success) return;

    setSessions(res.data);
  };
  let activePanelElement: JSX.Element;

  switch (activePanel) {
    case Panel.UPCOMMING:
      activePanelElement = (
        <UpcommingSessions
          sessions={futureSessions!}
          updateSessions={fetchSessions}
          workouts={workouts!}
          updateWorkouts={setWorkouts}
        />
      );
      break;

    case Panel.CREATE:
      activePanelElement = <CreateWorkout exercices={exercices!} />;
      break;

    case Panel.PAST:
      activePanelElement = (
        <PastSessions
          sessions={pastSessions!}
          updateSessions={fetchSessions}
          workouts={workouts!}
          updateWorkouts={setWorkouts}
        />
      );
      break;

    default:
      activePanelElement = (
        <UpcommingSessions
          sessions={futureSessions!}
          updateSessions={fetchSessions}
          workouts={workouts!}
          updateWorkouts={setWorkouts}
        />
      );
  }
  return (
    <div className="">
      <NavBar></NavBar>
      <main className="flex flex-col px-10 gap-10 h-full pt-10 w-full ">
        <section className="flex flex-col md:flex-row justify-between md:mx-10 overflow-hidden h-50 relative min-h-fit gap-5">
          <aside className="w-9/10 md:w-full h-full flex flex-col md:gap-5">
            <p className="text-[#F3FFCA] text-xs w-min wrap-normal">
              {activePanel === Panel.CREATE
                ? "MAKE A WORKOUT"
                : "TRAINING HISTORY"}
            </p>
            <h2 className="text-white text-7xl font-black w-min flex-wrap">
              {activePanel === Panel.CREATE ? "CREATE WORKOUT" : "SESSION LOGS"}
            </h2>
            <div className="flex md:flex-row flex-col justify-between md:gap-20 gap-5 w-full">
              <p className="text-[#ADAAAA] w-fit wrap-break-word">
                {activePanel === Panel.CREATE
                  ? "Create and customize your own workouts."
                  : "Push past your limits. Review every set, every rep, and every \n PR recorded in your journey to peak performance."}
              </p>
              <div className="md:w-3/10 h-full flex gap-5 justify-center md:justify-end items-end">
                <article className="h-20 w-30 bg-[#131313] rounded-2xl flex flex-col p-4 justify-center gap-1">
                  <h2 className="text-[#ADAAAA] text-xs">THIS MONTH</h2>
                  <p className="text-[#F3FFCA] font-black text-xl">
                    {sessions === undefined
                      ? "Loading..."
                      : sessions.filter(
                          (s) =>
                            new Date(s.date).getMonth() ===
                              new Date().getMonth() &&
                            new Date(s.date).getFullYear() ===
                              new Date().getFullYear() &&
                            s.completed,
                        ).length}
                  </p>
                </article>
                <article className="h-20 w-30 bg-[#131313] rounded-2xl flex flex-col p-4 justify-center gap-1">
                  <h2 className="text-[#ADAAAA] text-xs">STREAK</h2>
                  <p className="text-[#FF7441] font-black text-xl">
                    {sessions === undefined
                      ? "Loading..."
                      : (() => {
                          const completedDays = new Set(
                            [...sessions, ...pastSessions!]
                              .filter((s) => s.completed)
                              .map((s) => new Date(s.date).toDateString()),
                          );

                          const today = new Date();
                          const yesterday = new Date();
                          yesterday.setDate(today.getDate() - 1);

                          const todayKey = today.toDateString();
                          const yesterdayKey = yesterday.toDateString();

                          // Gate condition: must have today or yesterday
                          if (
                            !completedDays.has(todayKey) &&
                            !completedDays.has(yesterdayKey)
                          ) {
                            return "0d";
                          }

                          // Start from the most recent valid day (today if possible, else yesterday)
                          const cursor = new Date(
                            completedDays.has(todayKey) ? today : yesterday,
                          );

                          let streak = 0;

                          while (completedDays.has(cursor.toDateString())) {
                            streak++;
                            cursor.setDate(cursor.getDate() - 1);
                          }

                          return streak + "d";
                        })()}
                  </p>
                </article>
              </div>
            </div>
          </aside>
        </section>
        <section>
          <div className="w-full h-20 bg-[#131313] rounded-2xl flex items-center px-5 gap-5">
            <GlowingButton
              outline={false}
              onClick={() => {
                setActivePanel(Panel.UPCOMMING);
              }}
              additionalClasses={`bg-none font-black tracking-tighter text-xs w-30! h-8! !rounded-2xl ${
                activePanel === Panel.UPCOMMING
                  ? "bg-[#F3FFCA] !text-[#516700]"
                  : "bg-[#1A1A1A] !text-[#ADAAAA]"
              }`}
            >
              Upcomming
            </GlowingButton>

            <GlowingButton
              outline={false}
              onClick={() => {
                setActivePanel(Panel.PAST);
              }}
              additionalClasses={`bg-none font-black tracking-tighter text-xs w-30! h-8! !rounded-2xl ${
                activePanel === Panel.PAST
                  ? "bg-[#F3FFCA] !text-[#516700]"
                  : "bg-[#1A1A1A] !text-[#ADAAAA]"
              }`}
            >
              Past
            </GlowingButton>
            <GlowingButton
              outline={false}
              onClick={() => {
                setActivePanel(Panel.CREATE);
              }}
              additionalClasses={`bg-none font-black tracking-tighter text-xs w-30! h-8! !rounded-2xl ${
                activePanel === Panel.CREATE
                  ? "bg-[#F3FFCA] !text-[#516700]"
                  : "bg-[#1A1A1A] !text-[#ADAAAA]"
              }`}
            >
              Create
            </GlowingButton>
          </div>
        </section>
        {sessions === undefined ||
        workouts === undefined ||
        exercices === undefined
          ? "Loading..."
          : activePanelElement}
      </main>
    </div>
  );
}

export default WorkoutsPanel;
