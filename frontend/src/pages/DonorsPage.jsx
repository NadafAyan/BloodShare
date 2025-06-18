"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Badge } from "../components/ui/badge"
import { Heart, ArrowLeft, Search, Phone, MapPin, Clock, Filter } from "lucide-react"

export default function DonorsPage() {
  const [searchFilters, setSearchFilters] = useState({
    bloodGroup: "",
    city: "",
    availability: "",
  })

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"]

  // Mock donor data
  const allDonors = [
    {
      id: 1,
      name: "Rajesh Kumar",
      bloodGroup: "O+",
      city: "Mumbai",
      phone: "9876543210",
      lastDonation: "2024-01-15",
      availability: "Available",
      emergencyContact: true,
    },
    {
      id: 2,
      name: "Priya Sharma",
      bloodGroup: "A+",
      city: "Delhi",
      phone: "9876543211",
      lastDonation: "2023-12-20",
      availability: "Available",
      emergencyContact: true,
    },
    {
      id: 3,
      name: "Amit Patel",
      bloodGroup: "B+",
      city: "Bangalore",
      phone: "9876543212",
      lastDonation: "2024-02-10",
      availability: "Available",
      emergencyContact: false,
    },
    {
      id: 4,
      name: "Sneha Reddy",
      bloodGroup: "AB+",
      city: "Chennai",
      phone: "9876543213",
      lastDonation: "2024-01-05",
      availability: "Available",
      emergencyContact: true,
    },
    {
      id: 5,
      name: "Vikram Singh",
      bloodGroup: "O-",
      city: "Mumbai",
      phone: "9876543214",
      lastDonation: "2023-11-30",
      availability: "Available",
      emergencyContact: true,
    },
    {
      id: 6,
      name: "Anita Gupta",
      bloodGroup: "A-",
      city: "Pune",
      phone: "9876543215",
      lastDonation: "2024-02-01",
      availability: "Busy",
      emergencyContact: false,
    },
  ]

  const filteredDonors = allDonors.filter((donor) => {
    return (
      (!searchFilters.bloodGroup || donor.bloodGroup === searchFilters.bloodGroup) &&
      (!searchFilters.city || donor.city === searchFilters.city) &&
      (!searchFilters.availability || donor.availability === searchFilters.availability)
    )
  })

  const handleFilterChange = (field, value) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }))
  }

  const clearFilters = () => {
    setSearchFilters({ bloodGroup: "", city: "", availability: "" })
  }

  const getAvailabilityColor = (availability) => {
    return availability === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  const getDaysSinceLastDonation = (lastDonation) => {
    const today = new Date()
    const donationDate = new Date(lastDonation)
    const diffTime = Math.abs(today - donationDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Find Blood Donors</h1>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Search Filters</span>
                </CardTitle>
                <CardDescription>Use the filters below to find donors matching your requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Blood Group</Label>
                    <Select
                      value={searchFilters.bloodGroup}
                      onValueChange={(value) => handleFilterChange("bloodGroup", value)}
                    >
                      <SelectTrigger>
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
                  </div>

                  <div className="space-y-2">
                    <Label>City</Label>
                    <Select value={searchFilters.city} onValueChange={(value) => handleFilterChange("city", value)}>
                      <SelectTrigger>
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
                  </div>

                  <div className="space-y-2">
                    <Label>Availability</Label>
                    <Select
                      value={searchFilters.availability}
                      onValueChange={(value) => handleFilterChange("availability", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Busy">Busy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Showing {filteredDonors.length} of {allDonors.length} donors
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donors List */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {filteredDonors.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No donors found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search filters to find more donors.</p>
                  <Button onClick={clearFilters}>Clear All Filters</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredDonors.map((donor) => (
                  <Card key={donor.id} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                              <Heart className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">{donor.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{donor.city}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Phone className="h-4 w-4" />
                                  <span>{donor.phone}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <Badge variant="secondary" className="bg-red-100 text-red-800 text-sm px-3 py-1">
                              Blood Group: {donor.bloodGroup}
                            </Badge>
                            <Badge className={`text-sm px-3 py-1 ${getAvailabilityColor(donor.availability)}`}>
                              {donor.availability}
                            </Badge>
                            {donor.emergencyContact && (
                              <Badge variant="outline" className="text-sm px-3 py-1 border-orange-300 text-orange-700">
                                Emergency Contact
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>Last donation: {getDaysSinceLastDonation(donor.lastDonation)} days ago</span>
                          </div>
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-6">
                          <div className="flex flex-col space-y-2">
                            <Button
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => window.open(`tel:${donor.phone}`)}
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Call Now
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() =>
                                window.open(
                                  `sms:${donor.phone}?body=Hi ${donor.name}, I found your contact through BloodShare. I need ${donor.bloodGroup} blood. Can you help?`,
                                )
                              }
                            >
                              Send SMS
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Emergency Request CTA */}
            <Card className="mt-8 bg-red-50 border-red-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Blood Urgently?</h3>
                <p className="text-gray-600 mb-4">
                  Submit an emergency request to notify all available donors in your area immediately.
                </p>
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link to="/emergency">Submit Emergency Request</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
