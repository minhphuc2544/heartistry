import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PasswordRecovery from "./pages/PasswordRecovery";
import OTPVerification from "./pages/OTPVerification";
import FlashCard from "./pages/FlashCard";
import Dictionary from "./pages/Dictionary";
import Setting from "./pages/Setting";
import Home from "./pages/Home";
import Menu from "./Menu";
import { useEffect, useState } from "react";

export default function App() {
  const baseURL = import.meta.env.BASE_URL;

  const [curPage, setCurPage] = useState(location.pathname.split("/")[1]);

  const [displayMenu, setDisplayMenu] = useState();

  useEffect(() => {
    if (curPage === "signup" || curPage === "login" || curPage === "otp" || curPage === "passwordrecovery") {
      setDisplayMenu(false);
    } else {
      setDisplayMenu(true);
    }
  }, [curPage]);

  return <>
    { displayMenu && <Menu /> }
    <Routes>
      <Route path={`${baseURL}*`} element={<Navigate to={baseURL} />} />
      <Route path={`${baseURL}/login`} element={<Login />} />
      <Route path={`${baseURL}/signup`} element={<SignUp />} />
      <Route path={`${baseURL}/passwordrecovery`} element={<PasswordRecovery />} />
      <Route path={`${baseURL}/otp`} element={<OTPVerification />} />
      <Route path={`${baseURL}`} element={<Home />} />
      <Route path={`${baseURL}/flashcard`} element={<FlashCard />} />
      <Route path={`${baseURL}/dictionary`} element={<Dictionary />} />
      <Route path={`${baseURL}/document`} element={<Document />} />
      <Route path={`${baseURL}/setting`} element={<Setting />} />
    </Routes>
  </>
}