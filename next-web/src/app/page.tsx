"use client"
import React, { useEffect } from 'react';
import Component from '@/components/mainComp';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface MyJwtPayload {
  id: number;
  role: string;
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        const decodedToken = jwtDecode<MyJwtPayload & { exp: number }>(token);
  
        const currentTime = Math.floor(Date.now() / 1000); 
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.log("Token has expired");
          localStorage.removeItem('token'); 
        } else {
          router.push(`/dashboard/${decodedToken.role}/${decodedToken.id}`);
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem('token');
      }
    }
  }, [router]);
  
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <Component />
    </div>
    
  );
}
