'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

function Profile() {
  const { data: session} = useSession();

  return (
    <div className='text-center'>
      {session ? (
        console.log(session),
        <div>
          <p>{session.user?.name}</p>
          <p>{session.user?.email}</p>
          {session.user?.image ? (
            <img
              src= {(session.user?.image)}
              alt='Profile Picture'
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto' }}
            />
          ) : (
            <p>No profile picture available</p>
          )}
        </div>
      ) : (
        <p>No session found. Please log in.</p>
      )}
    </div>
  );
}

export default Profile;
