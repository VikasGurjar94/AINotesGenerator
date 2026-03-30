import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { getCurrentUser } from "./services/api";
import { useDispatch, useSelector } from "react-redux";


export const serverUrl = "http://localhost:8000";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    getCurrentUser(dispatch);
    // const fetchCurrentUser = async () => {
    //   try {
    //     const response = await axios.get(`${serverUrl}/api/user/currentuser`, {
    //       withCredentials: true,
    //     });
    //     console.log("Current user:", response.data);
    //   } catch (error) {
    //     console.error("Fetch current user failed:", error);
    //   }
    // };

    // fetchCurrentUser();
  }, [dispatch]);

  const {userData} = useSelector((state) => state.user)
  console.log(userData)

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={userData ? <Navigate to="/" replace /> : <Auth />}
        />
      </Routes>
    </>
  );
};

export default App;
