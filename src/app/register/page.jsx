"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(3); 
  const router = useRouter();

  useEffect(() => {
    let timer;
    if (success) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      
      if (countdown === 0) {
        clearInterval(timer);
        router.push('/login');
      }
    }

    return () => clearInterval(timer);
  }, [success, countdown, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required!');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, image, password })
      });

      if (res.ok) {
        const form = e.target;
        setError('');
        setSuccess('User registered successfully!');
        form.reset();
      } else {
        const { message } = await res.json();
        setError(message || 'User registration failed!');
      }
    } catch (error) {
      setError('An error occurred: ' + error.message);
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-1 items-center justify-center'>
        <div className='text-center container mx-auto py-5'>
          <h1 className='text-2xl font-bold'>Register</h1>
          <p>Sign up for an account</p>
          <hr className='my-3' />
          <div className='flex flex-1 flex-col items-center justify-center'>
            <form onSubmit={handleSubmit} className='w-full max-w-md'>
              {error && (
                <div className='text-red-600 p-2 my-2 rounded-md'>
                  {error}
                </div>
              )}

              {success && (
                <div className='text-green-600 p-2 my-2 rounded-md'>
                  {success}
                  <p className='text-[#333]'>Going to Sign in Page in {countdown} seconds...</p>
                </div>
              )}
              <input onChange={(e) => setName(e.target.value)} className='block bg-gray-300 p-2 my-3 rounded-md w-full' type='text' placeholder='Enter your name' />
              <input onChange={(e) => setEmail(e.target.value)} className='block bg-gray-300 p-2 my-3 rounded-md w-full' type='email' placeholder='Enter your email' />
              <input onChange={(e) => setPassword(e.target.value)} className='block bg-gray-300 p-2 my-3 rounded-md w-full' type='password' placeholder='Enter your password' />
              <input onChange={(e) => setConfirmPassword(e.target.value)} className='block bg-gray-300 p-2 my-3 rounded-md w-full' type='password' placeholder='Confirm your password' />
              <input onChange={(e) => setImage(e.target.value)} className='block bg-gray-300 p-2 my-3 rounded-md w-full' type='text' placeholder='Your image URL' />

              <button type='submit' className='bg-[#333] text-white p-2 my-4 rounded-md w-full'>Sign up</button>
            </form>
            <hr className='my-3 w-full' />
            <p>Already have an account?<Link className='text-sky-600 font-bold' href={'/login'}> Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
