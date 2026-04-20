import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Session } from "../types/Session";

type SessionContextType = {
  sessions: Session[];
  setSessions: Dispatch<SetStateAction<Session[]>>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>([]);

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
