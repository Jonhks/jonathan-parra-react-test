import { create } from "zustand";
import { User } from "../types";
import { devtools, persist } from "zustand/middleware";

type AppState = {
  user: User;
  userAuth: boolean;
  login: (value: boolean) => void;
  getUser: (data: User) => void;
  logout: () => void;
};

export const useProductsStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        user: {
          email: "",
          password: "",
        },
        userAuth: false,
        login: () => {
          set((state) => ({
            ...state,
            userAuth: true,
          }));
        },
        getUser: (data) => {
          set((state) => ({
            ...state,
            user: {
              email: data.email,
              password: data.password,
            },
          }));
        },
        logout: () => {
          set((state) => ({
            ...state,
            userAuth: false,
            user: {
              email: "",
              password: "",
            },
          }));
        },
      }),
      {
        name: "AppStorage",
      }
    )
  )
);
