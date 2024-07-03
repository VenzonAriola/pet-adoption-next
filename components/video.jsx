'use client';

import gsap from 'gsap';

import { useGSAP } from '@gsap/react';

import { Button } from './ui/button';
import Link from 'next/link';

export const Video = ({ videoUrl, type }) => {
  const pet = type.toLowerCase();

  useGSAP(() => {
    gsap.to('.hero-btn', {
      opacity: 1,
      duration: 1.2,
      y: 0,
    });
  }, []);
  return (
    <div className='relative flex h-screen w-full items-center justify-center'>
      <video
        autoPlay
        loop
        playsInline
        muted
        className='h-full w-full object-cover object-bottom brightness-90'
      >
        <source src={videoUrl} type='video/mp4' />
      </video>

      <div className='absolute text-center text-[#eee]'>
        <h2 className='mb-5 text-9xl font-bold tracking-tight'>{type}</h2>

        <p className='mb-10 text-xl'>
          Find a {pet} or {pet === 'cats' ? 'kittens' : 'puppies'} ready to be
          loved by you.
        </p>

        <Button
          variant='outline'
          className='hero-btn w-8/12 translate-y-[150px] rounded-full border bg-white py-7 uppercase tracking-wider text-black opacity-0 hover:bg-transparent hover:text-white'
          size='lg'
          asChild
        >
          <Link href={type === 'Dogs' ? '/dogs' : 'cats'}>Meet our {type}</Link>
        </Button>
      </div>
    </div>
  );
};
