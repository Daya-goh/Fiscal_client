import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";

const Layout = ({ setToken }) => {
  return (
    <>
      <NavBar setToken={setToken} />
      <Outlet />
    </>
  );
};

export default Layout;
