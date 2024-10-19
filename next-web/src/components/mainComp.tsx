"use client"
import React, { useState, useCallback, useMemo } from 'react'
import { Poppins } from 'next/font/google'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const poppins = Poppins({ subsets: ['latin'], weight: ["900"] })

interface SignInFormProps {
  user: string;
  onSubmit: (email: string, password: string) => void;
  error: string;
  isLoading: boolean;
}

type UserRole = "Admin" | "Vendor" | "Washer";

const SignInForm: React.FC<SignInFormProps> = ({ user, onSubmit, error, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  }, [email, password, onSubmit]);

  return (
    <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-2xl mt-10" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In as {user}</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input 
          type="email" 
          id="email" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5AA362] text-gray-800" 
          required 
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input 
          type="password" 
          id="password" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5AA362] text-gray-800" 
          required 
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      {error && <p className="text-red-600 mb-4 font-semibold" role="alert">{error}</p>}
      <button 
        type="submit" 
        className="w-full bg-[#5AA362] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#4A8C52] transition duration-300 flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default function Component() {
  const [user, setUser] = useState<UserRole | "">("");
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(async (email: string, password: string) => {
    setError('');
    setIsLoading(true);

    try {
      console.log(user);
      const res = await fetch(`http://localhost:5000/api/v1/auth/${user.toLowerCase()}s/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user, router]);

  const handleUserSelect = useCallback((selectedUser: UserRole) => {
    setUser(selectedUser);
    setShowForm(true);
  }, []);

  const handleGoBack = useCallback(() => {
    setUser("");
    setShowForm(false);
    setError('');
  }, []);

  const memoizedSignInForm = useMemo(() => (
    <SignInForm 
      user={user} 
      onSubmit={handleSubmit} 
      error={error} 
      isLoading={isLoading} 
    />
  ), [user, handleSubmit, error, isLoading]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="p-4 bg-[#B8D7B3] text-white min-h-96 flex flex-col justify-around items-center shadow-2xl rounded-xl pt-10">
        <div><p className={`${poppins.className} text-6xl font-bold`}>EcoWare</p></div>
        
        {showForm ? (
          <>
            {memoizedSignInForm}
            <button 
              onClick={handleGoBack}
              className="mt-4 flex items-center justify-center bg-white text-[#5AA362] px-5 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              <ArrowLeft className="mr-2" size={20} />
              Go Back
            </button>
          </>
        ) : (
          <div className="flex flex-row gap-x-36">
            <button className="bg-[#5AA362] px-5 py-3 rounded-lg font-semibold hover:scale-105 transition duration-300" onClick={() => handleUserSelect("Admin")}>Admin</button>
            <button className="bg-[#5AA362] px-5 py-3 rounded-lg font-semibold hover:scale-105 transition duration-300" onClick={() => handleUserSelect("Vendor")}>Vendor</button>
            <button className="bg-[#5AA362] px-5 py-3 rounded-lg font-semibold hover:scale-105 transition duration-300" onClick={() => handleUserSelect("Washer")}>Washer</button>
          </div>
        )}
      </div>
    </div>
  )
}