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
  getProductDetail: (id: number) => void;
  data: DataProducts;
  loading: boolean;
  idProduct: number;
  getIdProduct: (id: number) => void;
  productDetail: DataProducts[0];
  getSortData: () => void;
  typeSort: boolean;
};

export const useProductsStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        loading: false,
        success: false,
        error: false,
        data: [],
        productDetail: {
          category: "",
          description: "",
          image: "",
          price: 0,
          id: 0,
          rating: {
            rate: 0,
            count: 0,
          },
          title: "",
        },
        errorData: null,
        idProduct: 0,
        user: {
          email: "",
          password: "",
        },
        userAuth: false,
        typeSort: false,
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
              // data: res.data,
              data: DataProducts.safeParse(res.data).data,
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
        getIdProduct: (id) => {
          set((state) => ({
            ...state,
            idProduct: id,
          }));
        },
        getProductDetail: async (id) => {
          console.log(id);
          set((state) => ({
            ...state,
            loading: true,
          }));
          try {
            const res = await axios.get(
              `https://fakestoreapi.com/products/${id}`
            );
            set((state) => ({
              ...state,
              success: true,
              productDetail: res.data,
              loading: false,
              // idProduct: 0,
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
        getSortData: async () => {
          set((state) => ({
            ...state,
            loading: true,
            typeSort: !state.typeSort,
          }));
          try {
            const res = await axios.get(
              `https://fakestoreapi.com/products?sort=${
                get().typeSort ? "desc" : "asc"
              }`
            );
            set((state) => ({
              ...state,
              success: true,
              // data: res.data,
              data: DataProducts.safeParse(res.data).data,
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
