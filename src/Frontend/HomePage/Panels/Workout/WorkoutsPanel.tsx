import NavBar from "../../../NavBar";
import GlowingButton from "../../../Components/General/GlowingButton";
import { act, useEffect, useState, type JSX } from "react";
import Allsessions from "./Components/Allsessions";
import CreateWorkout from "./Components/CreateWorkout";

export const Panel = {
  ALLSESSIONS: "ALLSESSIONS",
  PAST: "PAST",
  UPCOMMING: "UPCOMMING",
  CREATE: "CREATE",
} as const;

export type ActivePanel = (typeof Panel)[keyof typeof Panel];

function WorkoutsPanel() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(
    Panel.ALLSESSIONS,
  );
  const [activePanelElement, setActivePanelElement] = useState<JSX.Element>(
    <Allsessions />,
  );
  useEffect(() => {
    switch (activePanel) {
      case Panel.ALLSESSIONS: {
        setActivePanelElement(<Allsessions />);
        break;
      }
      case Panel.CREATE: {
        setActivePanelElement(<CreateWorkout />);
        break;
      }
      default: {
        setActivePanelElement(<Allsessions />);
      }
    }
  }, [activePanel]);
  return (
    <div>
      <NavBar></NavBar>
      <main className="flex flex-col px-10 gap-10 h-full pt-10 w-full">
        <section className="flex justify-between mx-10 overflow-hidden h-50 relative min-h-fit">
          <aside className="w-7/10 h-fuil flex flex-col gap-5">
            <p className="text-[#F3FFCA] text-xs">
              {activePanel === Panel.CREATE
                ? "MAKE A WORKOUT"
                : "TRAINING HISTORY"}
            </p>
            <h2 className="text-white text-7xl font-black">
              {activePanel === Panel.CREATE ? "CREATE WORKOUT" : "SESSION LOGS"}
            </h2>
            <p className="text-[#ADAAAA]">
              {activePanel === Panel.CREATE
                ? "Create and customize your own workouts."
                : "Push past your limits. Review every set, every rep, and every" +
                  <br /> +
                  "PR recorded in your journey to peak performance."}
            </p>
          </aside>
          <div className="w-3/10 h-full flex gap-5 justify-end items-end">
            <article className="h-20 w-30 bg-[#131313] rounded-2xl flex flex-col p-4 justify-center gap-1">
              <h2 className="text-[#ADAAAA] text-xs">THIS MONTH</h2>
              <p className="text-[#F3FFCA] font-black text-xl">24</p>
            </article>
            <article className="h-20 w-30 bg-[#131313] rounded-2xl flex flex-col p-4 justify-center gap-1">
              <h2 className="text-[#ADAAAA] text-xs">STREAK</h2>
              <p className="text-[#FF7441] font-black text-xl">12d</p>
            </article>
          </div>
        </section>
        <section>
          <div className="w-full h-20 bg-[#131313] rounded-2xl flex items-center px-5 gap-5">
            <GlowingButton
              outline={false}
              onClick={() => {
                setActivePanel(Panel.ALLSESSIONS);
              }}
              additionalClasses={`bg-none font-black tracking-tighter text-xs w-30! h-8! !rounded-2xl ${
                activePanel === Panel.ALLSESSIONS
                  ? "bg-[#F3FFCA] !text-[#516700]"
                  : "bg-[#1A1A1A] !text-[#ADAAAA]"
              }`}
            >
              All Sessions
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
        {activePanelElement}
      </main>
    </div>
  );
}

export default WorkoutsPanel;
