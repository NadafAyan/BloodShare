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
import { baseSepolia, defineChain } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";

// create the client with your clientId, or secretKey if in a server environment
/*
export const client = createThirdwebClient({
  clientId: "2c28257152e6a732d8a97dbf793eb33b",
});*/

// connect to your contract
/*export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0xa144E1772FFbce910b588CF2A6F674E31b068e2B",
});
*/

// Add this ABI array in your App.jsx
/*
const contractABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "uint8", "name": "_age", "type": "uint8"},
      {"internalType": "string", "name": "_bloodGroup", "type": "string"},
      {"internalType": "string", "name": "_city", "type": "string"}
    ],
    "name": "registerDonor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // ... other methods
];

// Update your contract export
export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0xa144E1772FFbce910b588CF2A6F674E31b068e2B",
  abi: contractABI, // Add this line
});
*/
/*
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_donor",
        "type": "address"
      }
    ],
    "name": "approveDonor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "donors",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "age",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "bloodGroup",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "city",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "wallet",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "donorList",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getApprovedDonors",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "age",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "bloodGroup",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "city",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "wallet",
            "type": "address"
          }
        ],
        "internalType": "struct BloodShare.Donor[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDonorList",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "age",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "bloodGroup",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "city",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "wallet",
            "type": "address"
          }
        ],
        "internalType": "struct BloodShare.Donor[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyDonorData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "age",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "bloodGroup",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "city",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "wallet",
            "type": "address"
          }
        ],
        "internalType": "struct BloodShare.Donor",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "_age",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "_bloodGroup",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_city",
        "type": "string"
      }
    ],
    "name": "registerDonor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalDonors",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
*/
// create the client with your clientId
export const client = createThirdwebClient({
  clientId: "0xEfA93B667ADaDD20e309A7C45C37802c3055840D", // Your actual client ID
});

// connect to your contract with ABI
export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0xEfA93B667ADaDD20e309A7C45C37802c3055840D",
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
