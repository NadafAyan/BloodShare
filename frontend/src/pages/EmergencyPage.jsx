"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Textarea } from "../components/ui/textarea"
import { Heart, ArrowLeft, AlertTriangle, Phone, MapPin } from "lucide-react"

export default function EmergencyPage() {
  const [formData, setFormData] = useState({
    patientName: "",
    contactPerson: "",
    phone: "",
    bloodGroup: "",
    unitsNeeded: "",
    hospital: "",
    city: "",
    urgencyLevel: "",
    additionalInfo: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"]
  const urgencyLevels = [
    { value: "critical", label: "Critical (Within 2 hours)" },
    { value: "urgent", label: "Urgent (Within 6 hours)" },
    { value: "moderate", label: "Moderate (Within 24 hours)" },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required"
    if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits"
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required"
    if (!formData.unitsNeeded) newErrors.unitsNeeded = "Units needed is required"
    if (!formData.hospital.trim()) newErrors.hospital = "Hospital name is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.urgencyLevel) newErrors.urgencyLevel = "Urgency level is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Emergency request submitted:", formData)
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-red-600" />
                <span className="text-2xl font-bold text-gray-900">BloodShare</span>
              </div>
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Success Message */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-2xl text-center">
            <Card className="shadow-xl">
              <CardContent className="py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Your emergency blood request has been sent to all available donors in your area. You should receive
                  calls from potential donors shortly.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 text-yellow-800">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-semibold">Important:</span>
                  </div>
                  <p className="text-yellow-700 mt-2">
                    Please keep your phone available. Donors will contact you directly at {formData.phone}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-red-600 hover:bg-red-700">
                    <Link to="/donors">View Available Donors</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/">Back to Home</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold text-gray-900">BloodShare</span>
            </div>
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Emergency Alert */}
      <section className="py-6 px-4 bg-red-600">
        <div className="container mx-auto">
          <div className="flex items-center justify-center space-x-3 text-white">
            <AlertTriangle className="h-6 w-6" />
            <span className="text-lg font-semibold">Emergency Blood Request</span>
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>
      </section>

      {/* Emergency Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">Emergency Blood Request</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Fill out this form to request blood donors immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Patient Information</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name *</Label>
                      <Input
                        id="patientName"
                        value={formData.patientName}
                        onChange={(e) => handleInputChange("patientName", e.target.value)}
                        className={errors.patientName ? "border-red-500" : ""}
                      />
                      {errors.patientName && <p className="text-sm text-red-500">{errors.patientName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        className={errors.contactPerson ? "border-red-500" : ""}
                      />
                      {errors.contactPerson && <p className="text-sm text-red-500">{errors.contactPerson}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                        placeholder="Enter 10-digit phone number"
                      />
                    </div>
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                {/* Blood Requirements */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Blood Requirements</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Blood Group Required *</Label>
                      <Select
                        value={formData.bloodGroup}
                        onValueChange={(value) => handleInputChange("bloodGroup", value)}
                      >
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
                      <Label htmlFor="unitsNeeded">Units Needed *</Label>
                      <Input
                        id="unitsNeeded"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.unitsNeeded}
                        onChange={(e) => handleInputChange("unitsNeeded", e.target.value)}
                        className={errors.unitsNeeded ? "border-red-500" : ""}
                      />
                      {errors.unitsNeeded && <p className="text-sm text-red-500">{errors.unitsNeeded}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Urgency Level *</Label>
                    <Select
                      value={formData.urgencyLevel}
                      onValueChange={(value) => handleInputChange("urgencyLevel", value)}
                    >
                      <SelectTrigger className={errors.urgencyLevel ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.urgencyLevel && <p className="text-sm text-red-500">{errors.urgencyLevel}</p>}
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Location Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital Name *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="hospital"
                        value={formData.hospital}
                        onChange={(e) => handleInputChange("hospital", e.target.value)}
                        className={`pl-10 ${errors.hospital ? "border-red-500" : ""}`}
                        placeholder="Enter hospital name and address"
                      />
                    </div>
                    {errors.hospital && <p className="text-sm text-red-500">{errors.hospital}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>City *</Label>
                    <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                      <SelectTrigger className={errors.city ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Additional Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Details</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                      placeholder="Any additional information that might help donors (e.g., specific requirements, timing, etc.)"
                      rows={4}
                    />
                  </div>
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
