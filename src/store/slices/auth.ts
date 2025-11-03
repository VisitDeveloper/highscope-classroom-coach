import { type StateCreator } from "zustand";

export interface AuthSlice {
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
}

export const createAuthSlice: StateCreator<
    AuthSlice,
    [],
    [],
    AuthSlice
> = (set) => ({
    token: null,
    setToken: (token) => set({ token }),
    clearToken: () => set({ token: null }),
});
