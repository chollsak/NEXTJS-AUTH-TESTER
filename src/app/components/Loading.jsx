import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Loading() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Perform any action after the loading
      router.push('/'); // Replace '/target-page' with the desired route
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-xl font-bold">Loading...</div>
    </div>
  );
}

export default Loading;
