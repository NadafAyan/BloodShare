"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useActiveAccount, ConnectButton } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { client } from "../app/clinet";
import { getContract } from "thirdweb";
import { sepolia, defineChain } from "thirdweb/chains";

const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0xEfA93B667ADaDD20e309A7C45C37802c3055840D",
});

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    bloodGroup: "",
    city: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
  ];

  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.age) newErrors.age = "Age is required";
    else if (formData.age < 18 || formData.age > 65)
      newErrors.age = "Age must be between 18 and 65";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!account) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Option 1: Try with full function signature
      const transaction = prepareContractCall({
        contract,
        method: "function registerDonor(string memory _name, uint8 _age, string memory _bloodGroup, string memory _city)",
        params: [
          formData.fullName,
          parseInt(formData.age),
          formData.bloodGroup,
          formData.city,
        ],
      });

      console.log("Prepared transaction:", transaction);

      sendTransaction(transaction, {
        onSuccess: (result) => {
          console.log("Transaction successful:", result);
          alert("Registration successful! Your request is pending admin approval.");
          navigate("/camps");
        },
        onError: (error) => {
          console.error("Transaction failed:", error);
          alert("Registration failed. Please try again.");
        },
      });
    } catch (error) {
      console.error("Error preparing transaction:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold text-gray-900">
                BloodShare
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <ConnectButton client={client} />
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Registration Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Register as Blood Donor
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Join our blockchain-based community of life-savers
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!account ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    Please connect your wallet to register as a donor
                  </p>
                  <ConnectButton client={client} />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Personal Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          className={errors.fullName ? "border-red-500" : ""}
                        />
                        {errors.fullName && (
                          <p className="text-sm text-red-500">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="age">Age *</Label>
                        <Input
                          id="age"
                          type="number"
                          min="18"
                          max="65"
                          value={formData.age}
                          onChange={(e) =>
                            handleInputChange("age", parseInt(e.target.value))
                          }
                          className={errors.age ? "border-red-500" : ""}
                        />
                        {errors.age && (
                          <p className="text-sm text-red-500">{errors.age}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Blood Group *</Label>
                        <Select
                          value={formData.bloodGroup}
                          onValueChange={(value) =>
                            handleInputChange("bloodGroup", value)
                          }
                        >
                          <SelectTrigger
                            className={errors.bloodGroup ? "border-red-500" : ""}
                          >
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
                        {errors.bloodGroup && (
                          <p className="text-sm text-red-500">
                            {errors.bloodGroup}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>City *</Label>
                        <Select
                          value={formData.city}
                          onValueChange={(value) =>
                            handleInputChange("city", value)
                          }
                        >
                          <SelectTrigger
                            className={errors.city ? "border-red-500" : ""}
                          >
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
                        {errors.city && (
                          <p className="text-sm text-red-500">{errors.city}</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Connected Wallet:</strong> {account.address}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          handleInputChange("agreeToTerms", checked)
                        }
                      />
                      <Label
                        htmlFor="agreeToTerms"
                        className={errors.agreeToTerms ? "text-red-500" : ""}
                      >
                        I agree to the terms and conditions *
                      </Label>
                    </div>
                    {errors.agreeToTerms && (
                      <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                  >
                    {isSubmitting ? "Registering..." : "Register on Blockchain"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}