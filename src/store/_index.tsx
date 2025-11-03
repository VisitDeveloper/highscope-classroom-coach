// store/store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type AuthSlice, createAuthSlice } from "./slices/auth";


type StoreState = AuthSlice;

export const useStore = create<StoreState>()(
    persist(
        (set, get, store) => ({
            ...createAuthSlice(set, get, store),

            // بعداً می‌تونی sliceهای دیگه رو هم اینجا اضافه کنی
            // ...createThemeSlice(set, get),
        }),
        {
            name: "main-store", // نام ذخیره‌سازی در localStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);
