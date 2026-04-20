import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import GlowingButton from "../../../../Components/General/GlowingButton";
import type { Session } from "../../../../types/Session";
import { updateSession } from "../Scripts/UpdateSession";
import type { Workout } from "../../../../types/Workout";
import type { Set } from "../../../../types/Set";
import InputField from "../../../../Components/General/InputField";
import { useSessions } from "../../../../Context/useSessions";
import { useAuth } from "../../../../Context/useAuth";

interface Props {
  session: Session;
  day: string;
  month: string;
  year: string;
  workout: Workout;
  tags: string[];
}

function SessionCard({ session, day, month, year, workout, tags }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [sessionData, setSessionData] = useState<Session>(session);
  const { setSessions } = useSessions();
  const { logout } = useAuth();

  console.log(session);
  useEffect(() => {
    (async () => {
      const res = await updateSession(sessionData);
      if (!res.success) {
        logout();
      }
    })();
  }, [sessionData]);

  return (
    <div className="bg-[#131313] p-5 rounded-2xl flex gap-5 flex-col">
      <section className=" flex flex-col md:flex-row gap-5 items-center h-fit md:h-35 w-full">
        <div className="flex flex-col text-white w-10 items-center">
          <p className="text-3xl font-black">{day}</p>
          <p className="text-xs text-[#ADAAAA]">{month.toUpperCase()}</p>
          <p className="text-xs text-[#ADAAAA]">{year}</p>
        </div>
        <span className="md:h-20 w-50 md:w-1  border-b-2 md:border-b-0 md:border-r-2 border-[#484847]/10 md:min-w-1"></span>
        <span
          className={`w-fit h-fit rounded-3xl tracking-tighter font-semibold px-2 py-2 text-center flex justify-center items-center ${sessionData.completed ? "bg-[#F3FFCA]/10 text-[#F3FFCA]" : "bg-[#FF7441]/10 text-[#FF7441]"}`}
        >
          {session.completed ? "COMPLETED" : "NOT COMPLETED"}
        </span>
        <div>
          <p className="text-4xl text-white font-black tracking-tighter">
            {workout.workoutName ?? "Unknown workout"}
          </p>
          <p className="text-xs text-[#ADAAAA]">{workout.workoutDesc}</p>
        </div>
        {/*Tags */}
        <div className="flex flex-col justify-center items-end flex-1">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-[#1A1A1A] text-white rounded-3xl w-fit"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Expand */}
        <button
          className="bg-[#20201F] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer "
          onClick={() => setShowDetails((prev) => !prev)}
        >
          <img
            src="RightArrowIcon.png"
            alt=""
            className={`rotate-90 h-5 w-auto transition duration-300 ${
              showDetails && "-rotate-90!"
            }`}
          />
        </button>
      </section>
      {showDetails && (
        <div className="flex flex-col gap-5">
          <section className="flex gap-10 flex-wrap justify-center">
            {sessionData.exercices.map((exercice) => {
              return (
                <article className="h-fit">
                  <p className="text-white tracking-tighter font-black border-b-2 w-fit mb-2">
                    {exercice.name.toUpperCase()}
                  </p>
                  <div className="flex gap-2 flex-col">
                    <li className="list-none text-white flex flex-col gap-5">
                      {exercice.sets?.map((set: Set, index: number) => {
                        return (
                          <div className="flex gap-2 items-start">
                            <p className="px-2 h-fit py-1 rounded-4xl bg-amber-200/10 text-amber-200 flex justify-center items-center">
                              {"Set " + (index + 1)}
                            </p>
                            {/* Reps */}
                            <div className="flex flex-col items-center justify-start">
                              <label htmlFor="">Reps</label>
                              <InputField
                                key={index}
                                placeholder="0"
                                value={set.reps}
                                additionalClasses="w-15!  bg-[#1A1A1A] rounded-2xl! border-0 h-7 w-full placeholder:text-[#ADAAAA]/60 placeholder:text-xs text-white text-xs"
                                onChange={(e) => {
                                  const value = Number(e.target.value);
                                  if (isNaN(value)) return;
                                  setSessionData((prev) => ({
                                    ...prev,
                                    exercices: prev.exercices.map((ex) =>
                                      ex === exercice
                                        ? {
                                            ...ex,
                                            sets: ex.sets?.map((s, i) =>
                                              i === index
                                                ? { ...s, reps: value }
                                                : s,
                                            ),
                                          }
                                        : ex,
                                    ),
                                  }));
                                }}
                              />
                            </div>
                            {/* Weight */}
                            <div className="flex flex-col items-center">
                              <label htmlFor="">Weight</label>
                              <InputField
                                key={index}
                                placeholder="0"
                                value={set.weight}
                                additionalClasses="w-15! bg-[#1A1A1A] rounded-2xl! border-0 h-7 w-full placeholder:text-[#ADAAAA]/60 placeholder:text-xs text-white text-xs"
                                onChange={(e) => {
                                  const value = Number(e.target.value);
                                  if (isNaN(value)) return;
                                  setSessionData((prev) => ({
                                    ...prev,
                                    exercices: prev.exercices.map((ex) =>
                                      ex === exercice
                                        ? {
                                            ...ex,
                                            sets: ex.sets?.map((s, i) =>
                                              i === index
                                                ? { ...s, weight: value }
                                                : s,
                                            ),
                                          }
                                        : ex,
                                    ),
                                  }));
                                }}
                              />
                            </div>
                            <button
                              className="bg-red-400 px-2 py-1 rounded-4xl text-xs h-5 flex justify-center items-center text-white cursor-pointer"
                              onClick={() => {
                                setSessionData((prev) => ({
                                  ...prev,
                                  exercices: prev.exercices.map((ex) =>
                                    ex === exercice
                                      ? {
                                          ...ex,
                                          sets: ex.sets?.filter(
                                            (_, i) => i !== index,
                                          ),
                                        }
                                      : ex,
                                  ),
                                }));
                              }}
                            >
                              -
                            </button>
                          </div>
                        );
                      })}
                    </li>
                    <div className="flex gap-2">
                      <button
                        className="bg-lime-400 px-2 py-5 mt-5 rounded-4xl text-xs h-5 w-full flex justify-center items-center text-[#4A5E00] cursor-pointer"
                        onClick={() => {
                          const defaultSet: Set = {
                            reps: 0,
                            weight: 0,
                          };

                          setSessionData((prev) => ({
                            ...prev,
                            exercices: prev.exercices.map((ex) =>
                              ex === exercice
                                ? {
                                    ...ex,
                                    sets: [...(ex.sets ?? []), defaultSet],
                                  }
                                : ex,
                            ),
                          }));
                        }}
                      >
                        + SET
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
          <GlowingButton
            onClick={() => {
              setSessionData((prev) => ({
                ...prev,
                completed: !prev.completed,
              }));
              setSessions((prev: Session[]) =>
                prev.map((sessionS: Session) =>
                  sessionS._id === session._id
                    ? { ...sessionData, completed: !sessionS.completed }
                    : sessionS,
                ),
              );
            }}
            outline={false}
            additionalClasses={`bg-none !bg-lime-400 rounded-2xl px-2 py-2 tracking-tighter font-black cursor-pointer text-[#4A5E00]! w-40! text-xs! ${!sessionData.completed ? "" : "!bg-red-400 text-red-500! hover:shadow-[0_0_15px_rgba(255,0,0,0.7),0_0_30px_rgba(255,100,100,0.6)]!"}`}
          >
            {!sessionData.completed ? "COMPLETE WORKOUT" : "UNCOMPLETE WORKOUT"}
          </GlowingButton>
        </div>
      )}
    </div>
  );
}

export default SessionCard;
