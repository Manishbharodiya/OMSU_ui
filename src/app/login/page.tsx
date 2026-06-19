'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, AlertCircle, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile Number must be exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'mobileNumber') {
      // Only allow digits
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccessMessage('');

    // Simulate API call
    setTimeout(() => {
      setSuccessMessage('OTP sent successfully!');
      // Store data in sessionStorage for OTP page to use
      sessionStorage.setItem('loginData', JSON.stringify(formData));
      
      // Navigate after showing success message
      setTimeout(() => {
        router.push('/verify-otp');
      }, 500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
              <Sun className="h-7 w-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">OMSU</h1>
          <p className="text-sm text-slate-500 mt-1">Solar Solutions Platform</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>Enter your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendOTP} className="space-y-5">
              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-slate-900">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`h-10 ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                />
                {errors.fullName && (
                  <div className="flex items-center gap-2 text-red-600 text-xs mt-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{errors.fullName}</span>
                  </div>
                )}
              </div>

              {/* Mobile Number Field */}
              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-sm font-medium text-slate-900">
                  Mobile Number
                </Label>
                <div className="flex items-center gap-2">
                  <div className="h-10 px-3 rounded-md border border-slate-300 bg-slate-50 flex items-center text-slate-600 text-sm font-medium">
                    +91
                  </div>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    placeholder="10-digit number"
                    maxLength={10}
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className={`h-10 flex-1 ${errors.mobileNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  />
                </div>
                {errors.mobileNumber && (
                  <div className="flex items-center gap-2 text-red-600 text-xs mt-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{errors.mobileNumber}</span>
                  </div>
                )}
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Send OTP Button */}
              <Button
                type="submit"
                className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium mt-6"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>

              {/* Info Text */}
              <p className="text-xs text-slate-500 text-center mt-4">
                We'll send you a verification code to confirm your identity
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-xs text-slate-500 text-center mt-6">
          By continuing, you agree to our{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">Terms of Service</span>
        </p>
      </div>
    </div>
  );
}
