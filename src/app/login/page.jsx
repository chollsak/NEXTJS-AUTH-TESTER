'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(2);
  const [error, setError] = useState('');
  const router = useRouter();
  

  useEffect(() => {
    if (success) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        router.push('/welcome');
      }, countdown * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [success, countdown, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Submitting with email:', email, 'and password:', password);
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
  
      console.log('SignIn response:', res);
  
      if (res.ok) {
        setSuccess(true);
      } else {
        setError('Invalid email or password. Please try again.');
      }

    } catch (error) {
      console.log('Error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-1 items-center justify-center'>
        <div className='text-center container mx-auto py-5'>
          <h1 className='text-2xl font-bold'>Login</h1>
          <p>Login to your account</p>
          <hr className='my-3' />
          <div className='flex flex-1 flex-col items-center justify-center'>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className='text-red-600 p-2 my-2 rounded-md'>
                  {error}
                </div>
              )}

              {success && (
                <div className='text-green-600 p-2 my-2 rounded-md'>
                  Login successful. Redirecting to home page in {countdown} seconds...
                </div>
              )}

              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="block w-full bg-gray-300 p-2 my-2 rounded-md"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="block w-full bg-gray-300 p-2 my-2 rounded-md"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button type='submit' className='bg-[#333] text-white p-2 rounded-md'>Log In</button>
            </form>
            <hr className='my-3' />
            <p>Don't have an account? <Link className='text-sky-600 font-bold' href={'/register'}> Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
