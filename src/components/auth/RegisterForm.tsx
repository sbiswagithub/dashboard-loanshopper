import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import registerBg from '@/assets/register-bg.jpeg';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !firstName || !lastName || !mobile || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    const fullName = `${title} ${firstName} ${lastName}`;
    const success = await register(mobile, password, fullName);
    if (!success) {
      toast({
        title: "Registration Failed",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 bg-[#4e73df]">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-0">
          <div className="lg:flex">
            {/* Left side - Image (hidden on mobile) */}
            <div className="hidden lg:block lg:w-6/12">
              <div 
                className="h-full w-full bg-cover bg-center min-h-[700px]"
                style={{ backgroundImage: `url(${registerBg})` }}
              />
            </div>
            
            {/* Right side - Form */}
            <div className="w-full lg:w-7/12 p-8 sm:p-12">
              <div className="text-center mb-8">
                <h4 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Create an Account!</h4>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Selection */}
                <div className="flex justify-center gap-6">
                  {['Mr', 'Mrs', 'Ms'].map((titleOption) => (
                    <label key={titleOption} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="title"
                        value={titleOption}
                        checked={title === titleOption}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{titleOption}</span>
                    </label>
                  ))}
                </div>
                
                {/* Name Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full py-4 px-6 text-base border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full py-4 px-6 text-base border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                {/* Mobile */}
                <div>
                  <input
                    type="tel"
                    placeholder="Mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full py-4 px-6 text-base border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                {/* Password Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-4 px-6 text-base border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Repeat Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full py-4 px-6 text-base border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-4 px-6 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Register Account"}
                </button>
                
                <hr className="my-6 border-gray-200" />
                
                <button 
                  type="button"
                  className="w-full py-4 px-6 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                >
                  <i className="fab fa-linkedin mr-2"></i>
                  Register with LinkedIn
                </button>
                
                <hr className="my-6 border-gray-200" />
              </form>
              
              <div className="text-center space-y-3">
                <div>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <div>
                  <button
                    onClick={onSwitchToLogin}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Already have an account? Login!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};