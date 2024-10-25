import { HashRouter, Route, Routes } from "react-router-dom";
import {
  Error404,
  Login,
  Products,
  Users,
  CreateProducts,
} from "./pages/index";
import NavBar from "./components/AppBar";
import { ProtectedRoute } from "./components/ProtectedRedirect";

const App = () => {
  const auth = true;

  return (
    <HashRouter>
      <NavBar auth={auth} />
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="*"
          element={<Error404 />}
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute auth={auth}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute auth={auth}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/create"
          element={
            <ProtectedRoute auth={auth}>
              <CreateProducts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
