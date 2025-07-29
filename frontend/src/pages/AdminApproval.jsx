"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Phone, User, MapPin, AlertCircle } from "lucide-react"
import axios from "axios"

export default function AdminApprovals() {
  const [donors, setDonors] = useState([])

  useEffect(() => {
    fetchDonors()
  }, [])

  const fetchDonors = async () => {
    try {
      const res = await axios.get("/api/donors/pending") // 👈 Your backend route for pending approvals
      setDonors(res.data)
    } catch (err) {
      console.error("Failed to fetch donors:", err)
    }
  }

  const handleApproval = async (id, status) => {
    try {
      await axios.post(`/api/donors/${id}/approve`, { status }) // 👈 Update donor status
      setDonors(donors.filter((d) => d.id !== id))
    } catch (err) {
      console.error("Error updating donor status:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pending Donor Approvals</h1>

        {donors.length === 0 ? (
          <div className="text-center mt-20 text-gray-600">
            <AlertCircle className="h-10 w-10 mx-auto mb-2 text-red-500" />
            <p>No pending donor approvals at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {donors.map((donor) => (
              <Card key={donor.id} className="shadow-md hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{donor.full_name}</CardTitle>
                      <CardDescription>{donor.email}</CardDescription>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-gray-700 space-y-2">
                    <p className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-red-500 mr-2" /> Age: {donor.age}
                    </p>
                    <p className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-500 mr-2" /> {donor.city}
                    </p>
                    <p className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-red-500 mr-2" /> {donor.phone}
                    </p>
                    <p>Blood Group: <span className="font-medium">{donor.blood_group}</span></p>
                    {donor.medical_conditions && (
                      <p className="text-sm text-gray-500">Medical Conditions: {donor.medical_conditions}</p>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleApproval(donor.id, "approved")}>
                      Approve
                    </Button>
                    <Button variant="outline" onClick={() => handleApproval(donor.id, "rejected")}>
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
