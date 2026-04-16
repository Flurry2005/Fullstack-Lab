import React, { useState } from "react";
import type { Workout } from "../../../../types/Workout";
import GlowingButton from "../../../../Components/General/GlowingButton";
import InputField from "../../../../Components/General/InputField";
import { addSession } from "../Scripts/AddSession";

interface Props {
  closeSelector: () => void;
  updateSessions: () => void;
  workouts: Workout[];
}

type DateType = {
  dd: string;
  mm: string;
  year: string;
};

function WorkoutSelector({ closeSelector, updateSessions, workouts }: Props) {
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

        <section className="flex flex-col gap-5 py-2">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout._id ?? workout.workoutName}
              workout={workout}
              closeSelector={closeSelector}
              updateSessions={updateSessions}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default WorkoutSelector;

function WorkoutCard({
  workout,
  closeSelector,
  updateSessions,
}: {
  workout: Workout;
  closeSelector: () => void;
  updateSessions: () => void;
}) {
  const [date, setDate] = useState<DateType>({
    dd: "",
    mm: "",
    year: "",
  });

  return (
    <article className="w-full h-fit bg-[#1A1A1A] rounded-2xl p-5">
      <p className="text-white font-black text-4xl">{workout.workoutName}</p>

      <div className="flex flex-wrap gap-2 mt-2">
        {workout.tags.map((tag: string) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs bg-[#131313] text-white rounded-3xl"
          >
            {tag}
          </span>
        ))}
      </div>

      <InputField
        placeholder="DD"
        type="number"
        id="day"
        name="day"
        value={date.dd}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDate((prev: DateType) => ({
            ...prev,
            dd: e.target.value,
          }));
        }}
        required={true}
        additionalClasses="bg-[#131313] rounded! border-0 h-10 w-17 placeholder:text-[#ADAAAA]/60 placeholder:text-xs text-white text-xs"
      />
      <InputField
        placeholder="MM"
        type="number"
        id="mm"
        name="mm"
        value={date.mm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDate((prev: DateType) => ({
            ...prev,
            mm: e.target.value,
          }));
        }}
        required={true}
        additionalClasses="bg-[#131313] rounded! border-0 h-10 w-17 placeholder:text-[#ADAAAA]/60 placeholder:text-xs text-white text-xs"
      />
      <InputField
        placeholder="YYYY"
        type="number"
        id="year"
        name="year"
        value={date.year}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDate((prev: DateType) => ({
            ...prev,
            year: e.target.value,
          }));
        }}
        required={true}
        additionalClasses="bg-[#131313] rounded! border-0 h-10 w-20 placeholder:text-[#ADAAAA]/60 placeholder:text-xs text-white text-xs"
      />

      <GlowingButton
        outline={false}
        onClick={async () => {
          await addSession(
            workout._id,
            new Date(Number(date.year), Number(date.mm) - 1, Number(date.dd)),
          );
          updateSessions();

          closeSelector();
        }}
        additionalClasses="text-black!"
      >
        ADD
      </GlowingButton>
    </article>
  );
}
