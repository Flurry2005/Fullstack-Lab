import { useEffect, useState, type JSX } from "react";
import { useAuth } from "../Context/useAuth";
import ProfilePanel from "./Panels/ProfilePanel";
import DashboardPanel from "./Panels/DashboardPanel";
import GlowingButton from "../Components/General/GlowingButton";
import WorkoutsPanel from "./Panels/Workout/WorkoutsPanel";

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
  const [activePanel, setActivePanel] = useState<ActivePanel>(Panel.HOME);

  const [activePanelElement, setActivePanelElement] = useState<JSX.Element>(
    <ProfilePanel />,
  );

  useEffect(() => {
    switch (activePanel) {
      case Panel.PROFILE: {
        setActivePanelElement(<ProfilePanel />);
        break;
      }
      case Panel.DASHBOARD: {
        setActivePanelElement(<DashboardPanel />);
        break;
      }
      case Panel.WORKOUTS: {
        setActivePanelElement(<WorkoutsPanel />);
        break;
      }
      default: {
        setActivePanelElement(<DashboardPanel />);
      }
    }
  }, [activePanel]);

  return (
    <>
      <main className="w-screen min-h-screen flex flex-col md:flex-row">
        <aside className="bg-[#131313] md:w-60 md:min-h-screen px-5 pt-5 gap-10 flex flex-col">
          <div>
            <h1 className="text-[#CCFF00] italic text-xl ">KINETIC</h1>
            <p className="text-[#ADAAAA] text-[8px]">ELITE PERFORMANCE</p>
          </div>
          <nav>
            {!user ? (
              <button
                onClick={() => setActivePanel(Panel.HOME)}
                className={`w-full h-10 flex px-2 gap-2 items-center ${activePanel === Panel.HOME ? "text-[#CCFF00] border-l-2 rounded bg-[#1A1A1A]" : "text-[#ADAAAA]"}`}
              >
                <div
                  className={`h-4 w-4 ${
                    activePanel === Panel.HOME ? "bg-[#CCFF00]" : "bg-gray-400"
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
                Home
              </button>
            ) : (
              <>
                <button
                  onClick={() => setActivePanel(Panel.HOME)}
                  className={`w-full h-10 flex px-2 gap-2 items-center ${activePanel === Panel.HOME ? "text-[#CCFF00] border-l-2 rounded bg-[#1A1A1A]" : "text-[#ADAAAA]"}`}
                >
                  <div
                    className={`h-4 w-4 ${
                      activePanel === Panel.HOME
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
                  Home
                </button>
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
          {user && (
            <GlowingButton
              outline={false}
              onClick={() => setActivePanel(Panel.WORKOUTS)}
              additionalClasses="bg-none bg-[#CAFD00] font-black tracking-tighter text-xs !text-[#4A5E00] self-center mb-5 md:m-0"
            >
              + LOG NEW WORKOUT
            </GlowingButton>
          )}
        </aside>
        <section className="bg-[#0E0E0E] w-full min-h-full pb-10">
          {activePanelElement}
        </section>
      </main>
    </>
  );
}

export default Home;
