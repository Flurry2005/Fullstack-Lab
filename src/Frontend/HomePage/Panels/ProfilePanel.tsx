import React, { useRef, useState } from "react";
import { useAuth } from "../../Context/useAuth";
import NavBar from "../../NavBar";
import { useSessions } from "../../Context/useSessions";
import type { Workout } from "../../types/Workout";
import type { Session } from "../../types/Session.ts";
function ProfilePanel() {
  const { user, login } = useAuth();
  const [bio, setBio] = useState<string>(
    user?.bio ||
      "Hybrid Athlete. Pushing the boundaries of human performance through data-driven strength and endurance protocols.",
  );

  const { sessions } = useSessions();

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

  const fileRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    fileRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);

    console.log(file);
    console.log(imageUrl);

    if (user) {
      login({
        ...user,
        profilePicture: imageUrl,
      });
    }
  };

  if (!user)
    return (
      <>
        <NavBar />
        <p>No User is logged in</p>
      </>
    );

  return (
    <>
      <div>
        <NavBar />
        <main className="flex flex-col px-10 gap-10 h-full pt-10 w-full">
          <section className="flex justify-between px-10 h-60">
            <div className="flex gap-2 w-full ">
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "profilePicture.png"
                }
                alt=""
                className="rounded-full border-5 border-[#1A1A1A] h-50 w-auto aspect-square self-end"
              />
              <a
                className="relative w-4 h-full rounded-full cursor-pointer"
                onClick={openFilePicker}
              >
                <input
                  type="file"
                  ref={fileRef}
                  onChange={onFileChange}
                  accept="image/png, image/jpeg"
                  className="hidden bottom-0 -left-5 absolute w-8 h-8 z-10"
                />
                <div className="bg-[#CAFD00] rounded-full w-8 h-8 absolute bottom-0 -left-5 flex justify-center items-center">
                  <img
                    src="penIcon.png"
                    alt=""
                    className="h-4 w-4 object-cover"
                  />
                </div>
              </a>
              <div className="flex flex-col gap-4 w-full">
                <h2 className="font-black text-6xl text-white tracking-tighter">
                  {user.fullname.toUpperCase()}
                </h2>
                <span className="rounded-2xl bg-[#262626] px-3 text-xs py-1 w-fit text-[#F3FFCA]">
                  LEVEL 67
                </span>
                <textarea
                  className="text-[#ADAAAA] w-1/2 resize-none overflow-hidden"
                  value={bio}
                  maxLength={150}
                  onChange={(e) => {
                    setBio(e.currentTarget.value);
                    // auto-resize
                    e.currentTarget.style.height = "auto";
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                  }}
                  onBlur={() => {
                    login({
                      ...user,
                      bio,
                    });
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // prevents newline
                      e.currentTarget.blur(); // removes focus
                    }
                  }}
                />
              </div>
            </div>
            <div className="h-full w-fit flex flex-col justify-end items-center px-3">
              <h3 className="text-[#ADAAAA] text-l w-fit text-nowrap">
                MEMEBER SINCE
              </h3>
              <h2 className="text-[#F3FFCA] text-3xl font-extrabold w-fit text-nowrap">
                {monthNames[new Date(user.createdAt).getMonth()].toUpperCase() +
                  " " +
                  new Date(user.createdAt).getFullYear()}
              </h2>
            </div>
          </section>

          {/* Stats Board */}
          <main className="h-full w-full flex flex-col justify-around">
            {/* Heading */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-25 block bg-[#ADAAAA] h-0.5" />
              <p className="text-[#ADAAAA]">Statistics</p>
            </div>
            {/* Stats */}
            <section className="flex gap-5">
              <article className="bg-[#1A1A1A] w-40 h-40 rounded-3xl flex flex-col p-5 items-center justify-around overflow-hidden relative">
                <div className="bg-[#F3FFCA] absolute bottom-0 left-0 h-1 w-full"></div>
                <h2 className="text-[#ADAAAA]  font-light tracking-tighter">
                  WORKOUTS
                </h2>
                <p className="text-white font-black text-6xl">
                  {sessions === undefined
                    ? "Loading..."
                    : sessions.filter(
                        (session: Session) => session.completed === true,
                      ).length}
                </p>
              </article>
              <article className="bg-[#1A1A1A] w-60 h-40 rounded-3xl flex flex-col px-10 py-5 justify-around overflow-hidden relative">
                <div className="bg-[#FF7441] absolute bottom-0 left-0 h-1 w-full"></div>
                <h2 className="text-[#ADAAAA]  font-light tracking-tighter">
                  STREAK
                </h2>
                <div className="flex gap-2 items-center">
                  <p className="text-white font-black text-6xl">
                    {sessions === undefined
                      ? "Loading..."
                      : (() => {
                          const completedDays = new Set(
                            sessions
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
                            return "0";
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
                          return streak;
                        })()}
                  </p>

                  <img src="StreakIcon.png" alt="" className="h-10" />
                </div>
                <p className="text-[#ADAAAA] text-xs">
                  {sessions === undefined
                    ? "Loading..."
                    : (() => {
                        const completedDays = new Set(
                          sessions
                            .filter((s) => s.completed)
                            .map((s) => new Date(s.date).toDateString()),
                        );

                        const days = Array.from(completedDays)
                          .map((d) => new Date(d))
                          .sort((a, b) => a.getTime() - b.getTime());

                        if (days.length === 0) return 0;

                        let longest = 1;
                        let current = 1;

                        for (let i = 1; i < days.length; i++) {
                          const prev = days[i - 1];
                          const curr = days[i];

                          const diff =
                            (curr.getTime() - prev.getTime()) /
                            (1000 * 60 * 60 * 24);

                          if (diff === 1) {
                            current++;
                          } else {
                            longest = Math.max(longest, current);
                            current = 1;
                          }
                        }

                        longest = Math.max(longest, current);

                        return "Personal Best: " + longest + " Days";
                      })()}
                </p>
              </article>
            </section>
          </main>
        </main>
      </div>
    </>
  );
}

export default ProfilePanel;
