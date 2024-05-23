'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loading from '../components/Loading';

function Navbar() {
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(2);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    let timer;
    if (success) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 500);
      
      if (countdown === 0) {
        router.push('http://localhost:3000');
      }
    }

    return () => clearInterval(timer);
  }, [success, countdown, router]);

  const signOutSystem = async () => {
    await signOut({ redirect: false });
    setSuccess(true);
  };

  return (
    <nav className='bg-[#333] text-white p-5'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          <div>
            <Link href={'/'}>Testerjs</Link>
          </div>
          <ul className='flex'> 
            <li className='mx-3'><Link href={'/login'}>Sign In</Link></li>
            <li className='mx-3'><Link href={'/register'}>Sign Up</Link></li>
            {session && (
              <li className="mx-3 px-2 rounded-md border-2 border-white bg-red-500 hover:bg-red-700 hover:border-red-700">
                <button onClick={signOutSystem}>Log Out</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
