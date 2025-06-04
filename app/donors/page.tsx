"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Search, MapPin, Calendar, Phone } from "lucide-react"

// Mock donor data
const mockDonors = [
  {
    id: 1,
    name: "John Smith",
    bloodGroup: "O+",
    city: "New York",
    lastDonated: "2024-01-15",
    phone: "+1-555-0123",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    bloodGroup: "A+",
    city: "New York",
    lastDonated: "2024-02-20",
    phone: "+1-555-0124",
  },
  {
    id: 3,
    name: "Mike Davis",
    bloodGroup: "B+",
    city: "Los Angeles",
    lastDonated: "2024-01-30",
    phone: "+1-555-0125",
  },
  {
    id: 4,
    name: "Emily Wilson",
    bloodGroup: "AB+",
    city: "Chicago",
    lastDonated: "2024-03-05",
    phone: "+1-555-0126",
  },
  {
    id: 5,
    name: "David Brown",
    bloodGroup: "O-",
    city: "New York",
    lastDonated: "2024-02-10",
    phone: "+1-555-0127",
  },
  {
    id: 6,
    name: "Lisa Garcia",
    bloodGroup: "A-",
    city: "Miami",
    lastDonated: "2024-01-25",
    phone: "+1-555-0128",
  },
]

export default function DonorsPage() {
  const [filters, setFilters] = useState({
    bloodGroup: "",
    city: "",
  })

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  const cities = ["New York", "Los Angeles", "Chicago", "Miami", "Houston", "Phoenix"]

  const filteredDonors = mockDonors.filter((donor) => {
    return (
      (!filters.bloodGroup || donor.bloodGroup === filters.bloodGroup) &&
      (!filters.city || donor.city.toLowerCase().includes(filters.city.toLowerCase()))
    )
  })

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const getBloodGroupColor = (bloodGroup: string) => {
    const colors: Record<string, string> = {
      "O+": "bg-red-100 text-red-800",
      "O-": "bg-red-200 text-red-900",
      "A+": "bg-blue-100 text-blue-800",
      "A-": "bg-blue-200 text-blue-900",
      "B+": "bg-green-100 text-green-800",
      "B-": "bg-green-200 text-green-900",
      "AB+": "bg-purple-100 text-purple-800",
      "AB-": "bg-purple-200 text-purple-900",
    }
    return colors[bloodGroup] || "bg-gray-100 text-gray-800"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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

      {/* Donors List */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Blood Donors</h1>
            <p className="text-lg text-gray-600">Search for verified blood donors in your area</p>
          </div>

          {/* Filters */}
          <Card className="mb-8 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Blood Group</Label>
                  <Select onValueChange={(value) => handleFilterChange("bloodGroup", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All blood groups" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All blood groups</SelectItem>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter city name"
                    value={filters.city}
                    onChange={(e) => handleFilterChange("city", e.target.value)}
                  />
                </div>

                <div className="flex items-end">
                  <Button onClick={() => setFilters({ bloodGroup: "", city: "" })} variant="outline" className="w-full">
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="mb-6">
            <p className="text-gray-600">
              Found <span className="font-semibold">{filteredDonors.length}</span> donors
            </p>
          </div>

          {/* Donors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <Card key={donor.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{donor.name}</CardTitle>
                    <Badge className={`${getBloodGroupColor(donor.bloodGroup)} font-bold`}>{donor.bloodGroup}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{donor.city}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Last donated: {formatDate(donor.lastDonated)}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{donor.phone}</span>
                  </div>

                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Contact Donor</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDonors.length === 0 && (
            <Card className="text-center py-12 shadow-lg border-0">
              <CardContent>
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-600 mb-2">No donors found</CardTitle>
                <CardDescription>Try adjusting your search filters or check back later for new donors.</CardDescription>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
