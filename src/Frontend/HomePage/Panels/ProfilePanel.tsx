import React from "react";
import { useAuth } from "../../Context/useAuth";
import NavBar from "../../NavBar";

function ProfilePanel() {
  const { user } = useAuth();

  if (!user)
    return (
      <>
        <NavBar />
        <p>No User is logged in</p>
      </>
    );

  return (
    <>
      <NavBar />
      <main className="flex flex-col px-10 gap-10 pt-3">
        <section className="flex gap-5 px-10">
          <img
            src="profilePicture.png"
            alt=""
            className="rounded-full border-5 border-[#1A1A1A] h-50 w-auto"
          />
          <div className="flex flex-col gap-4">
            <h2 className="font-extrabold text-5xl text-white">
              {user.fullname.toUpperCase()}
            </h2>
            <span className="rounded-2xl bg-[#262626] px-3 text-xs py-1 w-fit text-[#F3FFCA]">
              LEVEL 42
            </span>
            <p className="text-[#ADAAAA]">
              Hybrid Athlete. Pushing the boundaries of human performance
              through data-driven strength and endurance protocols.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default ProfilePanel;
