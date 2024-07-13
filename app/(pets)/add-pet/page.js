import { AddPetForm } from '@/components/pet-form';

import { currentUser } from '@clerk/nextjs/server';
export default async function AddPetPage() {
  const user = await currentUser();

  return (
    <div>
      <h1 className='mb-12 text-5xl font-bold'>Add Pet</h1>
      <AddPetForm />
    </div>
  );
}
