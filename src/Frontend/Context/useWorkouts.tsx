import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Workout } from "../types/Workout";
import { getWorkouts } from "../HomePage/Panels/Workout/Scripts/GetWorkouts";
import { useAuth } from "./useAuth";

type WorkoutContextType = {
  workouts: Workout[] | undefined;
  setWorkouts: Dispatch<SetStateAction<Workout[] | undefined>>;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[] | undefined>(undefined);
  const { user, logout } = useAuth();

  useEffect(() => {
    (async () => {
      if (!user) return;
      const res = await getWorkouts();

      if (!res.success) {
        logout();
        return;
      }

      setWorkouts(res.data);
    })();
  }, []);

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts }}>
      {children}
    </WorkoutContext.Provider>
  );
}
export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (!context)
    throw new Error("useWorkouts must be used within WorkoutProvider");
  return context;
}
