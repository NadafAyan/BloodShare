import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Calendar, MapPin, Users, Clock } from "lucide-react"

// Mock blood camp data
const bloodCamps = [
  {
    id: 1,
    title: "City Hospital Blood Drive",
    date: "2024-06-15",
    time: "9:00 AM - 5:00 PM",
    city: "New York",
    organizer: "City Hospital",
    address: "123 Medical Center Dr, New York, NY",
    expectedDonors: 150,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Community Center Blood Camp",
    date: "2024-06-20",
    time: "10:00 AM - 4:00 PM",
    city: "Los Angeles",
    organizer: "Red Cross LA",
    address: "456 Community Ave, Los Angeles, CA",
    expectedDonors: 200,
    status: "upcoming",
  },
  {
    id: 3,
    title: "University Blood Donation Event",
    date: "2024-06-25",
    time: "11:00 AM - 6:00 PM",
    city: "Chicago",
    organizer: "Chicago University",
    address: "789 Campus Rd, Chicago, IL",
    expectedDonors: 300,
    status: "upcoming",
  },
  {
    id: 4,
    title: "Corporate Blood Drive",
    date: "2024-07-01",
    time: "8:00 AM - 3:00 PM",
    city: "Miami",
    organizer: "Tech Corp Miami",
    address: "321 Business Blvd, Miami, FL",
    expectedDonors: 100,
    status: "upcoming",
  },
  {
    id: 5,
    title: "Mall Blood Donation Camp",
    date: "2024-07-05",
    time: "12:00 PM - 8:00 PM",
    city: "Houston",
    organizer: "Houston Blood Bank",
    address: "654 Shopping Center, Houston, TX",
    expectedDonors: 250,
    status: "upcoming",
  },
  {
    id: 6,
    title: "Emergency Blood Drive",
    date: "2024-07-10",
    time: "24 Hours",
    city: "Phoenix",
    organizer: "Phoenix General Hospital",
    address: "987 Emergency Way, Phoenix, AZ",
    expectedDonors: 500,
    status: "urgent",
  },
]

export default function CampsPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    return status === "urgent"
      ? "bg-red-100 text-red-800 border-red-200"
      : "bg-green-100 text-green-800 border-green-200"
  }

  const getStatusText = (status: string) => {
    return status === "urgent" ? "Urgent" : "Upcoming"
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

      {/* Blood Camps */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Blood Camps</h1>
            <p className="text-lg text-gray-600">Join organized blood donation events in your area</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center shadow-lg border-0">
              <CardContent className="pt-6">
                <Calendar className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{bloodCamps.length}</div>
                <p className="text-gray-600">Upcoming Events</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0">
              <CardContent className="pt-6">
                <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">6</div>
                <p className="text-gray-600">Cities Covered</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">1,500+</div>
                <p className="text-gray-600">Expected Donors</p>
              </CardContent>
            </Card>
          </div>

          {/* Camps Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {bloodCamps.map((camp) => (
              <Card key={camp.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{camp.title}</CardTitle>
                      <CardDescription className="text-gray-600">Organized by {camp.organizer}</CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(camp.status)} border`}>{getStatusText(camp.status)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Calendar className="h-4 w-4 text-red-600" />
                      <span className="font-medium">{formatDate(camp.date)}</span>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-700">
                      <Clock className="h-4 w-4 text-red-600" />
                      <span>{camp.time}</span>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-700">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <div>
                        <div className="font-medium">{camp.city}</div>
                        <div className="text-sm text-gray-500">{camp.address}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-700">
                      <Users className="h-4 w-4 text-red-600" />
                      <span>Expected donors: {camp.expectedDonors}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      className={`w-full ${
                        camp.status === "urgent" ? "bg-red-600 hover:bg-red-700" : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {camp.status === "urgent" ? "Join Urgent Drive" : "Register for Camp"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="mt-12 bg-red-600 text-white shadow-xl border-0">
            <CardContent className="text-center py-12">
              <Heart className="h-12 w-12 mx-auto mb-4" />
              <CardTitle className="text-3xl mb-4">Want to Organize a Blood Camp?</CardTitle>
              <CardDescription className="text-red-100 text-lg mb-6 max-w-2xl mx-auto">
                Partner with BloodShare to organize blood donation events in your community. We provide support,
                volunteers, and resources to make your event successful.
              </CardDescription>
              <Button variant="secondary" size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
