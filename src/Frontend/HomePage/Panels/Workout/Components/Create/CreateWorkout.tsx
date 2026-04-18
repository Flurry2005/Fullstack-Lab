import { useState } from "react";
import InputField from "../../../../../Components/General/InputField";
import { createWorkout } from "../../Scripts/CreateWorkout";
import GlowingButton from "../../../../../Components/General/GlowingButton";
import Exercise from "./Exercise";
import type { Exercice } from "../../../../../types/Exercice";

interface Props {
  exercices: Exercice[];
}

function CreateWorkout({ exercices }: Props) {
  const [selectedExercices, setSelectedExercices] = useState<Exercice[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          const workoutName = formData.get("workoutName")?.toString();

          const res = await createWorkout(
            workoutName!,
            tags,
            selectedExercices,
          );

          if (res.success) {
          }
          setTags([]);
        }}
        method="POST"
        className="flex flex-col gap-5"
      >
        <label htmlFor="workoutName" className="text-white">
          Workout Name
        </label>
        <InputField
          placeholder="Chest Focus"
          id="workoutName"
          name="workoutName"
          required={true}
          additionalClasses="bg-[#1A1A1A] rounded! border-0 h-10 w-full placeholder:text-[#ADAAAA]/60 placeholder:text-xs text-white text-xs"
        ></InputField>
        {/* Tags */}
        <p className="text-white">Tags</p>
        <div className="flex gap-5">
          <GlowingButton
            outline={false}
            buttonType="button"
            onClick={() => {
              console.log(tags);
              if (tags.includes("Chest")) {
                setTags((prev) => prev.filter((tag) => tag !== "Chest"));
              } else {
                setTags((prev) => [...prev, "Chest"]);
              }
            }}
            additionalClasses={`bg-none font-black tracking-tighter text-xs w-15! h-8! rounded-4xl! ${
              tags.includes("Chest")
                ? "bg-[#F3FFCA] !text-[#516700]"
                : "!bg-[#1A1A1A] !text-[#ADAAAA]"
            }`}
          >
            Chest
          </GlowingButton>
          <GlowingButton
            outline={false}
            buttonType="button"
            onClick={() => {
              console.log(tags);
              if (tags.includes("Back")) {
                setTags((prev) => prev.filter((tag) => tag !== "Back"));
              } else {
                setTags((prev) => [...prev, "Back"]);
              }
            }}
            additionalClasses={`bg-none font-black tracking-tighter text-xs w-15! h-8! rounded-4xl! ${
              tags.includes("Back")
                ? "bg-[#F3FFCA] !text-[#516700]"
                : "!bg-[#1A1A1A] !text-[#ADAAAA]"
            }`}
          >
            Back
          </GlowingButton>
          <GlowingButton
            outline={false}
            buttonType="button"
            onClick={() => {
              console.log(tags);
              if (tags.includes("Legs")) {
                setTags((prev) => prev.filter((tag) => tag !== "Legs"));
              } else {
                setTags((prev) => [...prev, "Legs"]);
              }
            }}
            additionalClasses={`bg-none font-black tracking-tighter text-xs w-15! h-8! rounded-4xl! ${
              tags.includes("Legs")
                ? "bg-[#F3FFCA] !text-[#516700]"
                : "!bg-[#1A1A1A] !text-[#ADAAAA]"
            }`}
          >
            Legs
          </GlowingButton>
        </div>

        {/* Exercices */}
        <p className="text-white">Exercices</p>
        <Exercise
          exercices={exercices}
          selectedExercices={selectedExercices}
          setSelectedExercices={setSelectedExercices}
        ></Exercise>

        <GlowingButton
          outline={false}
          onClick={() => {}}
          additionalClasses="bg-none bg-[#CAFD00] font-black tracking-tighter text-xs !text-[#4A5E00] w-40!"
        >
          + CREATE WORKOUT
        </GlowingButton>
      </form>
    </div>
  );
}

export default CreateWorkout;
