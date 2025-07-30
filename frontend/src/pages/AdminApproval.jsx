"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { User, MapPin, AlertCircle } from "lucide-react";
import { useActiveAccount, ConnectButton, useReadContract } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import {  client,contract } from "../app/clinet";

export default function AdminApprovals() {

  


  const [processingDonor, setProcessingDonor] = useState(null);

  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  // Use the useReadContract hook to fetch donors
  const { data: donorList, isPending: loading, refetch } = useReadContract({
    contract,
    method: "function getDonorList() view returns ((string name, uint8 age, string bloodGroup, string city, bool approved, address registeredBy)[])",
    params: [],
  });

  // Filter only unapproved donors
  const pendingDonors = donorList ? donorList.filter(donor => !donor.approved) : [];

  const handleApproval = async (donorAddress) => {
    try {
      setProcessingDonor(donorAddress);
      
      const transaction = prepareContractCall({
        contract,
        method: "function approveDonor(address donorAddress)",
        params: [donorAddress],
      });

      sendTransaction(transaction, {
        onSuccess: (result) => {
          console.log("Approval successful:", result);
          alert("Donor approved successfully!");
          refetch(); // Refresh the donor list
          setProcessingDonor(null);
        },
        onError: (error) => {
          console.error("Approval failed:", error);
          alert("Failed to approve donor. Please try again.");
          setProcessingDonor(null);
        },
      });
    } catch (err) {
      console.error("Error approving donor:", err);
      alert("Something went wrong. Please try again.");
      setProcessingDonor(null);
    }
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
            <p className="text-gray-600 mb-6">Please connect your admin wallet to access the approval panel.</p>
            <ConnectButton client={client} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading pending approvals...</p>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pending Donor Approvals</h1>
          <div className="text-sm text-gray-600">
            Connected as: {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </div>
        </div>

        {pendingDonors.length === 0 ? (
          <div className="text-center mt-20 text-gray-600">
            <AlertCircle className="h-10 w-10 mx-auto mb-2 text-red-500" />
            <p>No pending donor approvals at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pendingDonors.map((donor, index) => (
              <Card key={index} className="shadow-md hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{donor.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        Wallet: {donor.registeredBy}
                      </CardDescription>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-gray-700 space-y-2">
                    <p className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-red-500 mr-2" /> 
                      Age: {donor.age.toString()}
                    </p>
                    <p className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-500 mr-2" /> 
                      {donor.city}
                    </p>
                    <p>
                      Blood Group: <span className="font-medium">{donor.bloodGroup}</span>
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white" 
                      onClick={() => handleApproval(donor.registeredBy)}
                      disabled={processingDonor === donor.registeredBy}
                    >
                      {processingDonor === donor.registeredBy ? "Approving..." : "Approve Donor"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}