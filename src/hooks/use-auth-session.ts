import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthSessionType = {
  token: string;
  setToken: (novoToken: string) => void;
  clearToken: () => void;
};

export const useAuthSessionStore = create<AuthSessionType>()(
  persist(
    (set) => ({
      token: "",
      setToken: (novoToken) => set((state) => ({ ...state, token: novoToken })),
      clearToken: () => set((state) => ({ ...state, token: "" })),
    }),
    {
      name: "@auth-session-store",
    }
  )
);
