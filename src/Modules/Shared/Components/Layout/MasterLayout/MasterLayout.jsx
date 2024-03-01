import React from "react";
import { Outlet } from "react-router-dom";
// import { UserContext } from "../../../../Context/Context";
import NavbarM from "../../Navbar/NavbarM";

export default function MasterLayout({ userData }) {
  return (
    <>
      <NavbarM userData={userData} />
      <Outlet />
    </>
  );
}