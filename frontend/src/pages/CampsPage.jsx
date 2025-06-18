"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Heart, ArrowLeft, Calendar, MapPin, Users, Phone } from "lucide-react"

export default function CampsPage() {
  const [selectedCity, setSelectedCity] = useState("")

  const cities = ["All Cities", "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"]

  // Mock blood camp data
  const allCamps = [
    {
      id: 1,
      title: "Community Blood Drive - Andheri",
      organizer: "Rotary Club Mumbai",
      date: "2024-03-15",
      time: "9:00 AM - 5:00 PM",
      location: "Andheri Sports Complex, Mumbai",
      city: "Mumbai",
      expectedDonors: 200,
      contact: "9876543210",
      description: "Join us for a community blood donation drive. Free health checkup and refreshments provided.",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Corporate Blood Donation Camp",
      organizer: "TCS Foundation",
      date: "2024-03-18",
      time: "10:00 AM - 4:00 PM",
      location: "TCS Campus, Whitefield, Bangalore",
      city: "Bangalore",
      expectedDonors: 150,
      contact: "9876543211",
      description: "Corporate blood donation camp for employees and their families. Medical team on-site.",
      status: "Upcoming",
    },
    {
      id: 3,
      title: "University Blood Drive",
      organizer: "Delhi University NSS",
      date: "2024-03-20",
      time: "8:00 AM - 6:00 PM",
      location: "Delhi University, North Campus",
      city: "Delhi",
      expectedDonors: 300,
      contact: "9876543212",
      description: "Annual blood donation drive by NSS volunteers. Open to all university students and staff.",
      status: "Upcoming",
    },
    {
      id: 4,
      title: "Hospital Blood Collection Drive",
      organizer: "Apollo Hospitals",
      date: "2024-03-22",
      time: "9:00 AM - 3:00 PM",
      location: "Apollo Hospital, Greams Road, Chennai",
      city: "Chennai",
      expectedDonors: 100,
      contact: "9876543213",
      description: "Blood collection drive to support hospital blood bank. Professional medical supervision.",
      status: "Upcoming",
    },
    {
      id: 5,
      title: "NGO Charity Blood Camp",
      organizer: "Lions Club Hyderabad",
      date: "2024-03-25",
      time: "10:00 AM - 5:00 PM",
      location: "Jubilee Hills Community Center, Hyderabad",
      city: "Hyderabad",
      expectedDonors: 180,
      contact: "9876543214",
      description: "Charity blood donation camp with cultural programs and awareness sessions.",
      status: "Upcoming",
    },
    {
      id: 6,
      title: "Tech Park Blood Drive",
      organizer: "Infosys Foundation",
      date: "2024-02-28",
      time: "9:00 AM - 4:00 PM",
      location: "Infosys Campus, Electronic City, Bangalore",
      city: "Bangalore",
      expectedDonors: 250,
      contact: "9876543215",
      description: "Successfully completed blood donation camp with great participation from tech employees.",
      status: "Completed",
    },
  ]

  const filteredCamps = allCamps.filter((camp) => {
    return selectedCity === "" || selectedCity === "All Cities" || camp.city === selectedCity
  })

  const upcomingCamps = filteredCamps.filter((camp) => camp.status === "Upcoming")
  const completedCamps = filteredCamps.filter((camp) => camp.status === "Completed")

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status) => {
    return status === "Upcoming" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
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

      {/* Hero Section */}
      <section className="py-12 px-4 bg-white border-b">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blood Donation Camps</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join upcoming blood donation camps in your city and be part of the life-saving community
          </p>

          {/* City Filter */}
          <div className="max-w-md mx-auto">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {cities.map((city) => (
                <option key={city} value={city === "All Cities" ? "" : city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Upcoming Camps */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Blood Camps</h2>

            {upcomingCamps.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming camps</h3>
                  <p className="text-gray-600 mb-4">
                    {selectedCity && selectedCity !== "All Cities"
                      ? `No upcoming blood camps found in ${selectedCity}.`
                      : "No upcoming blood camps found."}
                  </p>
                  <Button onClick={() => setSelectedCity("")}>View All Cities</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {upcomingCamps.map((camp) => (
                  <Card key={camp.id} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl text-gray-900 mb-2">{camp.title}</CardTitle>
                          <CardDescription className="text-gray-600 mb-4">
                            Organized by {camp.organizer}
                          </CardDescription>
                        </div>
                        <Badge className={`text-sm px-3 py-1 ${getStatusColor(camp.status)}`}>{camp.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 text-gray-700">
                            <Calendar className="h-5 w-5 text-red-600" />
                            <div>
                              <p className="font-semibold">{formatDate(camp.date)}</p>
                              <p className="text-sm text-gray-600">{camp.time}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 text-gray-700">
                            <MapPin className="h-5 w-5 text-red-600 mt-1" />
                            <div>
                              <p className="font-semibold">{camp.location}</p>
                              <p className="text-sm text-gray-600">{camp.city}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 text-gray-700">
                            <Users className="h-5 w-5 text-red-600" />
                            <p>
                              Expected Donors: <span className="font-semibold">{camp.expectedDonors}</span>
                            </p>
                          </div>

                          <div className="flex items-center space-x-3 text-gray-700">
                            <Phone className="h-5 w-5 text-red-600" />
                            <p>
                              Contact: <span className="font-semibold">{camp.contact}</span>
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{camp.description}</p>
                          </div>

                          <div className="flex flex-col space-y-2">
                            <Button
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => window.open(`tel:${camp.contact}`)}
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Contact Organizer
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() =>
                                window.open(
                                  `sms:${camp.contact}?body=Hi, I'm interested in participating in the blood donation camp: ${camp.title} on ${formatDate(camp.date)}.`,
                                )
                              }
                            >
                              Register Interest
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Completed Camps */}
      {completedCamps.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Recently Completed Camps</h2>

              <div className="grid gap-6">
                {completedCamps.map((camp) => (
                  <Card key={camp.id} className="shadow-lg opacity-75">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl text-gray-900 mb-2">{camp.title}</CardTitle>
                          <CardDescription className="text-gray-600 mb-4">
                            Organized by {camp.organizer}
                          </CardDescription>
                        </div>
                        <Badge className={`text-sm px-3 py-1 ${getStatusColor(camp.status)}`}>{camp.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 text-gray-700">
                            <Calendar className="h-5 w-5 text-red-600" />
                            <div>
                              <p className="font-semibold">{formatDate(camp.date)}</p>
                              <p className="text-sm text-gray-600">{camp.time}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 text-gray-700">
                            <MapPin className="h-5 w-5 text-red-600 mt-1" />
                            <div>
                              <p className="font-semibold">{camp.location}</p>
                              <p className="text-sm text-gray-600">{camp.city}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 text-gray-700">
                            <Users className="h-5 w-5 text-red-600" />
                            <p>
                              Donors Participated: <span className="font-semibold">{camp.expectedDonors}</span>
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{camp.description}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-12 px-4 bg-red-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want to Organize a Blood Camp?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Partner with BloodShare to organize blood donation camps in your community
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3">
            <Link to="/register">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
