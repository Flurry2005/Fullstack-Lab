import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Exercice } from "../types/Exercice";
import { getExercices } from "../HomePage/Panels/Workout/Scripts/GetExercices";
import { useAuth } from "./useAuth";

type ExerciceContextType = {
  exercices: Exercice[] | undefined;
  setExercices: Dispatch<SetStateAction<Exercice[] | undefined>>;
};

const ExerciceContext = createContext<ExerciceContextType | undefined>(
  undefined,
);

export function ExerciceProvider({ children }: { children: React.ReactNode }) {
  const [exercices, setExercices] = useState<Exercice[] | undefined>(undefined);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const res = await getExercices();

      if (!res.success) {
        logout();
        return;
      }

      setExercices(res.data);
    };

    fetchData();

    const interval = setInterval(fetchData, 60_000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <ExerciceContext.Provider value={{ exercices, setExercices }}>
      {children}
    </ExerciceContext.Provider>
  );
}
export function useExercices() {
  const context = useContext(ExerciceContext);
  if (!context)
    throw new Error("useExercices must be used within ExerciceProvider");
  return context;
}
