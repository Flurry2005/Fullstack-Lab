import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Session } from "../types/Session";
import { getSessions } from "../HomePage/Panels/Workout/Scripts/GetSessions";

type SessionContextType = {
  sessions: Session[] | undefined;
  setSessions: Dispatch<SetStateAction<Session[] | undefined>>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<Session[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const res = await getSessions();

      if (!res.success) return;

      setSessions(res.data);
    })();
  }, []);

  return (
    <SessionContext.Provider value={{ sessions, setSessions }}>
      {children}
    </SessionContext.Provider>
  );
}
export function useSessions() {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error("useSessions must be used within SessionProvider");
  return context;
}
