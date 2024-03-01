// import React, { useContext, useEffect } from "react";
// import Navbar from "../Navbar/Navbar";
// import { Outlet } from "react-router-dom";
// import { UserContext } from "../../../../Context/Context";

// export default function AuthLayout() {
//   let { setToken } = useContext(UserContext)

//   useEffect(() => {
//     if(localStorage.getItem("userToken") != null){
//       setToken(localStorage.getItem("userToken"))
//     }
//   }, [])
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// }
