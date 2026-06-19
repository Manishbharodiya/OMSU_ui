'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Smartphone } from 'lucide-react';

const CORRECT_OTP = '123456';
const RESEND_TIMEOUT = 30;

export default function VerifyOTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Get stored mobile number on mount
  useEffect(() => {
    const storedData = sessionStorage.getItem('loginData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setMobileNumber(data.mobileNumber);
    } else {
      // Redirect to login if no data found
      router.push('/login');
    }
  }, [router]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOTPChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(-1);

    if (digit === '' || /^\d$/.test(digit)) {
      const newOTP = [...otp];
      newOTP[index] = digit;
      setOtp(newOTP);
      setError('');

      // Move focus to next input if digit is entered
      if (digit && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        // Move to previous input if current is empty
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        // Clear current input
        const newOTP = [...otp];
        newOTP[index] = '';
        setOtp(newOTP);
      }
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOTP = otp.join('');

    if (enteredOTP.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    // Simulate API call
    setTimeout(() => {
      if (enteredOTP === CORRECT_OTP) {
        setSuccessMessage('OTP verified successfully! Redirecting...');
        // Clear session data
        sessionStorage.removeItem('loginData');
        
        // Navigate to dashboard after showing success message
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setError('Invalid OTP. Please try again. (Correct OTP: 123456)');
        setLoading(false);
      }
    }, 1000);
  };

  const handleResendOTP = () => {
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(RESEND_TIMEOUT);
    setCanResend(false);
    setError('');
    setSuccessMessage('OTP resent successfully!');
    
    // Clear success message after 2 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);

    // Focus on first input
    inputRefs.current[0]?.focus();
  };

  const maskedMobileNumber = mobileNumber
    ? `+91 ${mobileNumber.slice(0, 5)}${'*'.repeat(5)}`
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Verify OTP</h1>
          <p className="text-sm text-slate-500 mt-1">Enter the 6-digit code we sent</p>
        </div>

        {/* OTP Card */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg">Verification Code</CardTitle>
            <CardDescription>Sent to {maskedMobileNumber}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              {/* OTP Input Fields */}
              <div className="space-y-4">
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`h-12 w-12 rounded-lg border-2 text-center text-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        digit
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-300 bg-white hover:border-slate-400'
                      } ${error ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Verify Button */}
              <Button
                type="submit"
                className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium"
                disabled={loading || otp.some((digit) => digit === '')}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </form>

            {/* Resend Section */}
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
              <p className="text-xs text-slate-500 text-center">
                Didn't receive the code?
              </p>

              {canResend ? (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </Button>
              ) : (
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-600">
                    Resend OTP in{' '}
                    <span className="text-blue-600 font-semibold">{timeLeft}s</span>
                  </p>
                </div>
              )}
            </div>

            {/* Info */}
            <p className="text-xs text-slate-500 text-center mt-4">
              Please check your SMS messages for the verification code
            </p>
          </CardContent>
        </Card>

        {/* Help Link */}
        <p className="text-xs text-slate-500 text-center mt-6">
          <span className="cursor-pointer text-blue-600 hover:underline">Need help?</span>
        </p>
      </div>
    </div>
  );
}
