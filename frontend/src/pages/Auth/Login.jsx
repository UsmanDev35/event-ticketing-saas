// frontend/src/pages/Auth/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { loginApi, googleLoginApi } from '../../services/auth.service'; // Import googleLoginApi
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError(null);

    try {
      const userData = await loginApi(email, password);
      dispatch(loginSuccess({
        user: {
          id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role
        },
        token: userData.token
      }));
      navigate('/');
    } catch (err) {
      setError(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsAuthenticating(true);
    setError(null);
    try {
      // Pass the Google JWT to our backend
      const userData = await googleLoginApi(credentialResponse.credential);
      
      dispatch(loginSuccess({
        user: {
          id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role
        },
        token: userData.token
      }));
      
      navigate('/');
    } catch (err) {
      setError(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google Login failed or was cancelled. Please try again.');
  };

  return (
    <div className="min-h-screen flex bg-white">
      
      {/* Left Side: The Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24">
        <div className="max-w-md w-full mx-auto">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="bg-orange-500 p-1.5 rounded text-white flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              EVENTRI<span className="text-orange-500">X</span>
            </span>
          </Link>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>

          {/* Google OAuth Button */}
          <div className="mb-6 flex justify-center w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              width="100%"
              text="continue_with"
            />
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Security Banner: Only appears if there is an error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-orange-500 rounded-r-lg flex items-start gap-3">
              <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleManualLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                placeholder="usman@example.com"
                disabled={isAuthenticating}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                placeholder="••••••••"
                disabled={isAuthenticating}
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                Remember for 30 days
              </label>
              <a href="#" className="text-orange-500 font-medium hover:text-orange-600">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              disabled={isAuthenticating}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md mt-2 flex justify-center items-center disabled:opacity-70"
            >
              {isAuthenticating ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account? <Link to="/register" className="text-orange-500 font-medium hover:text-orange-600">Sign up</Link>
          </p>

        </div>
      </div>

      {/* Right Side: Visual Aesthetic */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-slate-900 opacity-80 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop" 
          alt="Nightlife Crowd" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white px-12 text-center">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <h3 className="text-3xl font-bold mb-4">Secure. Fast. Frictionless.</h3>
            <p className="text-lg text-slate-200">
              Join thousands of organizers managing next-generation nightlife experiences.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}