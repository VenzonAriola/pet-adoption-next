'use client';

import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import dogPhoto from '@/public/dog.jpg';
import { CloudCog } from 'lucide-react';

const Pets = ({ data }) => {
  const [sortBy, setSortBy] = useState('');

  const router = useRouter();

  function handleSort(value) {
    setSortBy(value);
    router.push(`/${value}`);
  }
  return (
    <>
      <h2 className='text-center text-3xl font-bold'>Pets</h2>
      <Select onValueChange={handleSort}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Sort By' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all-pets'>All Pets</SelectItem>
          <SelectItem value='dogs'>Dogs</SelectItem>
          <SelectItem value='cats'>Cats</SelectItem>
        </SelectContent>
      </Select>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
        {data.map((pet) => (
          <div className='relative w-[300px]' key={pet._id}>
            <Link
              href={`/all-pets/${pet._id}`}
              className='block h-full w-full bg-red-500'
            >
              <Image
                // TODO: will be change later
                src={dogPhoto}
                alt='Photo of available pet'
                width={100}
                height={100}
                className='h-full w-full cursor-pointer rounded-xl object-center'
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
export default Pets;
