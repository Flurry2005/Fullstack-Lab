import { useState } from "react";
import { useAuth } from "../Context/useAuth";
import ProfilePanel from "./Panels/ProfilePanel";

export const Panel = {
  HOME: "HOME",
  DASHBOARD: "DASHBOARD",
  WORKOUTS: "WORKOUTS",
  PROGRESS: "PROGRESS",
  PROFILE: "PROFILE",
} as const;

export type ActivePanel = (typeof Panel)[keyof typeof Panel];

function Home() {
  const { user } = useAuth();
  const [activePanel, setActivePanel] = useState<ActivePanel>(Panel.DASHBOARD);

  const activePanelElement = <ProfilePanel />;

  return (
    <>
      <main className="w-screen h-screen flex">
        <aside className="bg-[#131313] w-60 h-full px-5 pt-5 gap-10 flex flex-col">
          <div>
            <h1 className="text-[#CCFF00] italic text-xl ">KINETIC</h1>
            <p className="text-[#ADAAAA] text-[8px]">ELITE PERFORMANCE</p>
          </div>
          <nav>
            {!user ? (
              <button className="w-full h-8 text-[#CCFF00] ">HOME</button>
            ) : (
              <>
                <button
                  onClick={() => setActivePanel(Panel.DASHBOARD)}
                  className={`w-full h-10 flex px-2 gap-2 items-center ${activePanel === Panel.DASHBOARD ? "text-[#CCFF00] border-l-2 rounded bg-[#1A1A1A]" : "text-[#ADAAAA]"}`}
                >
                  <div
                    className={`h-4 w-4 ${
                      activePanel === Panel.DASHBOARD
                        ? "bg-[#CCFF00]"
                        : "bg-gray-400"
                    }`}
                    style={{
                      WebkitMaskImage: "url(/dashboardIcon.png)",
                      maskImage: "url(/dashboardIcon.png)",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  />
                  Dashboard
                </button>
                <button
                  onClick={() => setActivePanel(Panel.WORKOUTS)}
                  className={`w-full h-10 flex px-2 gap-2 items-center ${activePanel === Panel.WORKOUTS ? "text-[#CCFF00] border-l-2 rounded bg-[#1A1A1A]" : "text-[#ADAAAA]"}`}
                >
                  <div
                    className={`h-4 w-4 ${
                      activePanel === Panel.WORKOUTS
                        ? "bg-[#CCFF00]"
                        : "bg-gray-400"
                    }`}
                    style={{
                      WebkitMaskImage: "url(/workoutsIcon.png)",
                      maskImage: "url(/workoutsIcon.png)",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  />
                  Workouts
                </button>
                <button
                  onClick={() => setActivePanel(Panel.PROGRESS)}
                  className={`w-full h-10 flex px-2 gap-2 items-center ${activePanel === Panel.PROGRESS ? "text-[#CCFF00] border-l-2 rounded bg-[#1A1A1A]" : "text-[#ADAAAA]"}`}
                >
                  <div
                    className={`h-4 w-4 ${
                      activePanel === Panel.PROGRESS
                        ? "bg-[#CCFF00]"
                        : "bg-gray-400"
                    }`}
                    style={{
                      WebkitMaskImage: "url(/progressIcon.png)",
                      maskImage: "url(/progressIcon.png)",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  />
                  Progress
                </button>
                <button
                  onClick={() => setActivePanel(Panel.PROFILE)}
                  className={`w-full h-10 flex px-2 gap-2 items-center ${activePanel === Panel.PROFILE ? "text-[#CCFF00] border-l-2 rounded bg-[#1A1A1A]" : "text-[#ADAAAA]"}`}
                >
                  <div
                    className={`h-4 w-4 ${
                      activePanel === Panel.PROFILE
                        ? "bg-[#CCFF00]"
                        : "bg-gray-400"
                    }`}
                    style={{
                      WebkitMaskImage: "url(/profileIcon.png)",
                      maskImage: "url(/profileIcon.png)",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  />
                  Profile
                </button>
              </>
            )}
          </nav>
        </aside>
        <section className="bg-[#0E0E0E] w-full h-full">
          {activePanelElement}
        </section>
      </main>
    </>
  );
}

export default Home;
