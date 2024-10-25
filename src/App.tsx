import { HashRouter, Route, Routes } from "react-router-dom";
import { Error404, Products, Users, CreateProducts } from "./pages/index";
import Login from "./pages/Login";
import NavBar from "./components/AppBar";
import { ProtectedRoute } from "./components/ProtectedRedirect";
import { useProductsStore } from "./store/store";

const App = () => {
  const userAuth = useProductsStore((store) => store.userAuth);
  console.log(userAuth);

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
      </Routes>
    </HashRouter>
  );
};

export default App;
