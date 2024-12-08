import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PasswordRecovery from "./pages/PasswordRecovery";
import OTPVerification from "./pages/OTPVerification";
import FlashCard from "./pages/FlashCard";
import Dictionary from "./pages/Dictionary";
import Setting from "./pages/Setting";
import Menu from "./Menu";

export default function App() {
  const baseURL = import.meta.env.BASE_URL;

  return <Routes>
    <Route path={`${baseURL}*`} element={<Navigate to={baseURL} />} />
    <Route path={`${baseURL}/login`} element={<Login />} />
    <Route path={`${baseURL}/signup`} element={<SignUp />} />
    <Route path={`${baseURL}/passwordrecovery`} element={<PasswordRecovery />} />
    <Route path={`${baseURL}/otp`} element={<OTPVerification />} />
    <Route path={`${baseURL}`} element={<Login />} />
    <Route path={`${baseURL}/flashcard`} element={<FlashCard />} />
    <Route path={`${baseURL}/dictionary`} element={<Dictionary />} />
    <Route path={`${baseURL}/document`} element={<Document />} />
    <Route path={`${baseURL}/setting`} element={<Setting />} />
  </Routes>
}