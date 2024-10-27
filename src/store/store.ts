import { create } from "zustand";
import { User, DataProducts } from "../types";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";

type AppState = {
  user: User;
  userAuth: boolean;
  login: (value: boolean) => void;
  getUser: (data: User) => void;
  logout: () => void;
  getData: () => void;
  data: DataProducts;
  loading: boolean;
};

export const useProductsStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        loading: false,
        success: false,
        error: false,
        data: [],
        errorData: null,
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
        getData: async () => {
          set((state) => ({
            ...state,
            loading: true,
          }));
          try {
            const res = await axios.get("https://fakestoreapi.com/products/");
            set((state) => ({
              ...state,
              success: true,
              data: res.data,
              // data: DataProducts.safeParse(res.data).data,
              // data: DataProducts.safeParse(res.data) && res.data,
              loading: false,
            }));
          } catch (err) {
            console.error("Error in data fetch:", err);
            set((state) => ({
              ...state,
              error: true,
              errorData: "err.message",
            }));
          }
        },
      }),
      {
        name: "AppStorage",
      }
    )
  )
);
