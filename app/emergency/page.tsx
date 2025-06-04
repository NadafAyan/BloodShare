"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Heart, ArrowLeft, AlertTriangle } from "lucide-react"

export default function EmergencyPage() {
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    city: "",
    unitsNeeded: "",
    additionalNotes: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required"
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.unitsNeeded) newErrors.unitsNeeded = "Units needed is required"
    else if (Number.parseInt(formData.unitsNeeded) < 1) newErrors.unitsNeeded = "At least 1 unit is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Emergency request submitted:", formData)
      alert("Emergency request submitted successfully! We will notify nearby donors immediately.")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold text-gray-900">BloodShare</span>
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Emergency Request Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-xl border-0 border-l-4 border-l-red-600">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <CardTitle className="text-3xl font-bold text-gray-900">Emergency Blood Request</CardTitle>
              </div>
              <CardDescription className="text-lg text-gray-600">
                Submit an urgent request for blood donation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-sm">
                  <strong>Important:</strong> This form is for emergency situations only. We will immediately notify all
                  matching donors in your area.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange("patientName", e.target.value)}
                    className={errors.patientName ? "border-red-500" : ""}
                    placeholder="Enter patient's full name"
                  />
                  {errors.patientName && <p className="text-sm text-red-500">{errors.patientName}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Required Blood Group *</Label>
                    <Select onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                      <SelectTrigger className={errors.bloodGroup ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.bloodGroup && <p className="text-sm text-red-500">{errors.bloodGroup}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className={errors.city ? "border-red-500" : ""}
                      placeholder="Enter city name"
                    />
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unitsNeeded">Units Needed *</Label>
                  <Input
                    id="unitsNeeded"
                    type="number"
                    value={formData.unitsNeeded}
                    onChange={(e) => handleInputChange("unitsNeeded", e.target.value)}
                    className={errors.unitsNeeded ? "border-red-500" : ""}
                    placeholder="Number of blood units required"
                    min="1"
                  />
                  {errors.unitsNeeded && <p className="text-sm text-red-500">{errors.unitsNeeded}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                    placeholder="Any additional information (hospital name, contact details, urgency level, etc.)"
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg">
                  Submit Emergency Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
