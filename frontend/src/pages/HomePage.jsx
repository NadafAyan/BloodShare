import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Heart, Users, MapPin, Calendar,LogOut } from "lucide-react"
//import LogoutButton from "../components/ui/logout"

export default function HomePage() {
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
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/register" className="text-gray-600 hover:text-red-600 transition-colors">
                Register
              </Link>
              <Link to="/donors" className="text-gray-600 hover:text-red-600 transition-colors">
                Find Donors
              </Link>
              <Link to="/emergency" className="text-gray-600 hover:text-red-600 transition-colors">
                Emergency Request
              </Link>
              <Link to="/camps" className="text-gray-600 hover:text-red-600 transition-colors">
                Blood Camps
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Save Lives by <span className="text-red-600">Donating Blood</span> Today
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect blood donors with those in need. Join our community of life-savers and make a difference in
              someone's life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                <Link to="/register">Register as Donor</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3"
              >
                <Link to="/donors">Find Donors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why BloodShare?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform connects blood donors with patients in need, making it easier to save lives in critical
              situations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Connect Donors</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Find verified blood donors in your area quickly and efficiently when you need them most.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <MapPin className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Location-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Search for donors based on your city and blood group requirements for faster response.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Calendar className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Blood Camps</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Stay updated with upcoming blood donation camps and events in your area.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-red-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of donors who have already saved lives through BloodShare.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3">
            <Link to="/register">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">BloodShare</span>
          </div>
          <p className="text-gray-400">© 2024 BloodShare. Saving lives, one donation at a time.</p>
        </div>
      </footer>
    </div>
  )
}
