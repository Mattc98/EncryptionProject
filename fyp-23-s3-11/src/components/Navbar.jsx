"use client";

import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // or 'next/router' for older versions


function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter(); // Hook to access the router

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevents automatic redirection by next-auth
    router.push('/'); // Redirect to home page
  };

  if (session) {
    return (
      <div className='flex items-center space-x-4'>
        <Link href={`/${session.user.name}`} className='text-teal-500 hover:underline'>
          {session.user.name}
        </Link>
        <button className='bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700' onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <button className='bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700' onClick={() => signIn()}>
      Sign in
    </button>
  );
}

const Navbar = () => {
  return (
    <nav className='bg-gray-800 text-white'>
      <ul className='flex items-center justify-between p-4'>
        <li className='text-2xl font-bold'>
          <img src='/images/logo.png' alt='Logo' className='h-8 w-auto' />
        </li>
        <li className='flex space-x-4'>
          <Link className='text-white hover:text-gray-400' href='/'>Home</Link>
          <Link className='text-white hover:text-gray-400' href='/about'>About</Link>
        </li>
        <li className='ml-auto'>
          <AuthButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
