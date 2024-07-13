import logo from '@/public/pet.png';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const AuthLayout = ({ children }) => {
  return (
    <div className='grid h-full grid-cols-1 flex-col items-center justify-center md:grid-cols-2'>
      <div className='hidden h-full items-center justify-center bg-[#cd9e48] md:flex'>
        <Image src={logo} className='mix-blend-multiply' />
      </div>
      <div className='flex items-center justify-center'>
        <ClerkLoading>
          <Loader2 className='animate-spin' />
        </ClerkLoading>
        <ClerkLoaded>{children}</ClerkLoaded>
      </div>
    </div>
  );
};
export default AuthLayout;
