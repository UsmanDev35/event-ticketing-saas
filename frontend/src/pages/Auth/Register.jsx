// frontend/src/pages/Auth/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../../services/auth.service';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const navigate = useNavigate();

  const handleManualRegister = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError(null);

    try {
      // 1. Call the backend to create the user
      await registerApi(name, email, password);

      // 2. Send them to the Login page so they can manually log in
      navigate('/login');
      
    } catch (err) {
      setError(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      
      {/* Left Side: The Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24">
        <div className="max-w-md w-full mx-auto">
          
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="bg-orange-500 p-1.5 rounded text-white flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              EVENTRI<span className="text-orange-500">X</span>
            </span>
          </Link>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h2>
          <p className="text-gray-500 mb-8">Join thousands of users discovering live experiences.</p>

          {/* Security Banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-orange-500 rounded-r-lg flex items-start gap-3">
              <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleManualRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                placeholder="John Doe"
                disabled={isAuthenticating}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                placeholder="you@example.com"
                disabled={isAuthenticating}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required
                minLength="6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                placeholder="••••••••"
                disabled={isAuthenticating}
              />
            </div>

            <button 
              type="submit" 
              disabled={isAuthenticating}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md mt-4 flex justify-center items-center disabled:opacity-70"
            >
              {isAuthenticating ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-orange-500 font-medium hover:text-orange-600">Log in</Link>
          </p>

        </div>
      </div>

      {/* Right Side: Visual Aesthetic */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-slate-900 opacity-80 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1470229722913-7c092b212292?q=80&w=2000&auto=format&fit=crop" 
          alt="Concert Experience" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white px-12 text-center">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <h3 className="text-3xl font-bold mb-4">Never miss a moment.</h3>
            <p className="text-lg text-slate-200">
              Get instant access to thousands of live events, straight from your device.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}