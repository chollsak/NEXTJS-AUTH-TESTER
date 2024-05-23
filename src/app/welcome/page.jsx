'use client';

import React from 'react'
import Navbar from '../components/Navbar'
import { useSession } from 'next-auth/react';

function WelcomePage() {

    const {data: session} = useSession();
    console.log(session);

  return (
    <div>
        <div className='container mx-auto'>
            <div className='flex justify-center items-center mt-12'>
                <div className='text-center'>
                    <h1 className='text-4xl font-bold text-gray-800'>Welcome <span className='text-sky-600 font-extrabold'>{session?.user?.name}</span> to TesterJS-Auth</h1>
                    <p className='text-gray-600 mt-2'>The best place to test your JavaScript skills</p>
                    <div className='flex justify-center'>
                        <img src='https://i.gifer.com/embedded/download/SF1B.gif' alt='Welcome' className='mt-6 w-80 h-96' />
                       <img src='https://betanews.com/wp-content/uploads/2018/06/gifs-on-cli.gif' alt='Welcome' className='mt-6 h-96' /> 
                       <img src='https://i.gifer.com/embedded/download/SF1B.gif' alt='Welcome' className='mt-6 w-80 h-96' />
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default WelcomePage