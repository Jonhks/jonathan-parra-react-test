import classes from "./index.module.css";

export const Login = () => {
  return <h1>Login(Public) </h1>;
};

export const Error404 = () => {
  return <div className={classes.bg404}>Error 404(Public) </div>;
};

export const Products = () => {
  return <h1>Productos (Privada) </h1>;
};

export const CreateProducts = () => {
  return <h1>Create Products (Privada) </h1>;
};
export const Users = () => {
  return <h1>Users (Privada) </h1>;
};
