import DeploymentModel from "./assets/svg/deployment_model.svg"

export default function App() {
  const baseURL = import.meta.env.BASE_URL;

  return <Routes>
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
}