import { create } from "zustand";
import { User, DataProducts, NewProduct } from "../types";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";

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
  deleteProduct: () => void;
  getUpdateProduct: () => void;
  addNewProduct: (product: NewProduct) => void;
  updateUser: (user: User) => void;
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
          email: "admin@admin.com",
          password: "Admin$admin1",
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
        deleteProduct: async () => {
          set((state) => ({
            ...state,
            loading: true,
          }));
          try {
            const res = await axios.delete(
              `https://fakestoreapi.com/products/${get().idProduct}`
            );

            set((state) => ({
              ...state,
              success: true,
              data: get().data.filter((prod) => prod.id !== res.data.id),
              loading: false,
            }));
            toast.success("Producto eliminado correctamente", {
              position: "bottom-right",
              theme: "light",
            });
          } catch (err) {
            console.error("Error in data fetch:", err);
            set((state) => ({
              ...state,
              error: true,
              errorData: "err.message",
            }));
            toast.error("Producto NO se pudo ELIMINAR correctamente", {
              position: "bottom-right",
              theme: "light",
            });
          }
        },
        getUpdateProduct: async () => {
          set((state) => ({
            ...state,
            loading: true,
          }));
          try {
            const resp = await axios({
              method: "put",
              url: "https://fakestoreapi.com/products/1",
              data: {
                title: "Cambiando",
                price: 100000.5,
                description: "Cambio este producto",
                image: "https://dummyjson.com/image/150",
                category: "PRUEBAAAAAA",
                rating: {
                  rate: 1,
                  count: 1,
                },
              },
            });
            set((state) => ({
              ...state,
              success: true,
              data: get().data.map((product) =>
                get().idProduct === product.id ? resp.data : product
              ),
              loading: false,
            }));
            toast.success("Producto editado correctamente", {
              position: "bottom-right",
              theme: "light",
            });
          } catch (err) {
            console.error("Error in data fetch:", err);
            set((state) => ({
              ...state,
              error: true,
              errorData: "err.message",
            }));
          }
        },
        addNewProduct: async (product) => {
          set((state) => ({
            ...state,
            loading: true,
          }));
          try {
            const resp = await axios({
              method: "post",
              url: "https://fakestoreapi.com/products",
              data: product,
            });
            console.log(resp);
            set((state) => ({
              ...state,
              success: true,
              data: [...state.data, resp.data],
              loading: false,
            }));
            toast.success("Producto editado correctamente", {
              position: "bottom-right",
              theme: "light",
            });
          } catch (err) {
            console.error("Error in data fetch:", err);
            set((state) => ({
              ...state,
              error: true,
              errorData: "err.message",
            }));
          }
        },
        updateUser: (user) => {
          set((state) => ({
            ...state,
            user,
          }));
          toast.success("Usuario editado correctamente", {
            position: "bottom-right",
            theme: "light",
          });
        },
      }),
      {
        name: "AppStorage",
      }
    )
  )
);
