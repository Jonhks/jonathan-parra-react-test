import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Error404, Users, CreateProducts } from "./pages/index";
import Login from "./pages/Login";
import { Products } from "./pages/Products";
import ProductsDetail from "./pages/ProductsDetail/ProductsDetail";
import NavBar from "./components/AppBar";
import { ProtectedRoute } from "./components/ProtectedRedirect";
import { useProductsStore } from "./store/store";

const App = () => {
  const userAuth = useProductsStore((store) => store.userAuth);
  const getData = useProductsStore((store) => store.getData);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={userAuth ? <Products /> : <Login />}
        />
        <Route
          path="*"
          element={<Error404 />}
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute auth={userAuth}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute auth={userAuth}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/create"
          element={
            <ProtectedRoute auth={userAuth}>
              <CreateProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute auth={userAuth}>
              <ProductsDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
