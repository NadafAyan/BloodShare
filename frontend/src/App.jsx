import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import EmergencyPage from "./pages/EmergencyPage"
import DonorsPage from "./pages/DonorsPage"
import CampsPage from "./pages/CampsPage"
import AdminApproval from "./pages/AdminApproval"  

import {
  createThirdwebClient,
  getContract,
  resolveMethod,
} from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({
  clientId: "YOUR_CLIENT_ID",
});

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0xa144E1772FFbce910b588CF2A6F674E31b068e2B",
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/emergency" element={<EmergencyPage />} />
      <Route path="/donors" element={<DonorsPage />} />
      <Route path="/camps" element={<CampsPage />} />
      <Route path="/AdminApproval" element={<AdminApproval />} />
    </Routes>
  )
}

export default App
