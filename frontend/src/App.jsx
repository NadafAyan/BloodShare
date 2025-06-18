import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import EmergencyPage from "./pages/EmergencyPage"
import DonorsPage from "./pages/DonorsPage"
import CampsPage from "./pages/CampsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/emergency" element={<EmergencyPage />} />
      <Route path="/donors" element={<DonorsPage />} />
      <Route path="/camps" element={<CampsPage />} />
    </Routes>
  )
}

export default App
