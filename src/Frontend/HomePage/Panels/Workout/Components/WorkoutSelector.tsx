import React from "react";
import type { Workout } from "../../../../types/Workout";
import GlowingButton from "../../../../Components/General/GlowingButton";

interface Props {
  closeSelector: () => void;
  workouts: any;
}

function WorkoutSelector({ closeSelector, workouts }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#131313] p-6 w-6/10 h-8/10 rounded-xl relative overflow-scroll overflow-x-hidden">
        <button
          onClick={closeSelector}
          className="absolute top-2 right-2 text-white cursor-pointer"
        >
          ✕
        </button>

        <div className="text-white text-2xl font-black tracking-tighter">
          YOUR WORKOUTS
        </div>
        {/* Workouts Section */}
        <section className="flex flex-col gap-5 py-2">
          {workouts.map((workout: Workout, i: number) => {
            return (
              <article
                key={i}
                className="w-full h-fit bg-[#1A1A1A] rounded-2xl p-5"
              >
                <p className="text-white font-black text-4xl">
                  {workout.workoutName}
                </p>
                <div className="flex gap-3 h-10">
                  {workout.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="w-fit h-8 text-center bg-[#131313] rounded-3xl px-2 py-1 text-white flex justify-center items-center"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <GlowingButton
                  outline={false}
                  onClick={() => {
                    closeSelector();
                  }}
                  additionalClasses="text-black!"
                >
                  ADD
                </GlowingButton>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default WorkoutSelector;
