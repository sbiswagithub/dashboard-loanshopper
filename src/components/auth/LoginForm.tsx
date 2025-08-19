import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import loginBg from '@/assets/login-bg.jpeg';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const success = await login(email, password);
    if (!success) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#4e73df]">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-0">
          <div className="lg:flex">
            {/* Left side - Image (hidden on mobile) */}
            <div className="hidden lg:block lg:w-1/2">
              <div 
                className="h-full w-full bg-cover bg-center min-h-[600px]"
                style={{ backgroundImage: `url(${loginBg})` }}
              />
            </div>
            
            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12">
              <div className="text-center mb-8">
                <h4 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Welcome Back</h4>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email Address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-4 px-6 text-base border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-4 px-6 text-base border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember Me
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-4 px-6 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Login"}
                </button>
                
                <hr className="my-6 border-gray-200" />
                
                <button 
                  type="button"
                  className="w-full py-4 px-6 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                >
                  <i className="fab fa-linkedin mr-2"></i>
                  Login with LinkedIn
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
                    onClick={onSwitchToRegister}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Create an Account!
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