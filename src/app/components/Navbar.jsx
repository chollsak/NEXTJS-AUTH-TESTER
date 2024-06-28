'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import Loading from '../components/Loading';

function Navbar() {
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(2);
  const [anchorEl, setAnchorEl] = useState(null);

  const router = useRouter();
  const { data: session, status } = useSession();

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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenProfile = () => {
    router.push('/profile');
  }

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <nav className='bg-[#333] text-white p-5'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          <div className='flex'>
            <Link href={'/'}>Testerjs</Link>
          </div>
          <ul className='flex'>
            {!session && (
              <>
                <li className='mx-3'>
                  <Link href={'/login'}>Sign In</Link>
                </li>
                <li className='mx-3'>
                  <Link href={'/register'}>Sign Up</Link>
                </li>
              </>
            )}

            {session && (
              <>
                <li className="mx-1">
                  <Tooltip title="Log Out" arrow>
                    <button className='px-2 rounded-md border-2 border-white bg-red-500 hover:bg-red-700 hover:border-red-700' onClick={signOutSystem}>Log Out</button>
                  </Tooltip>
                </li>
                <li className='mx-1'>
                  <Tooltip title="User Settings" arrow>
                    <IconButton onClick={handleMenu} color="inherit" className='h-4'>
                      <Avatar src={session.user.image} alt={session.user.name} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                  </Menu>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
