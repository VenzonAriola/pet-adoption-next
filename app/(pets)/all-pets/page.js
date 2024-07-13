import Pets from '@/components/pets';

import { getData } from './action';

export default async function PetsPage() {
  const { data } = await getData();

  return (
    <div className='flex flex-col gap-8'>
      <Pets data={data} />
    </div>
  );
}
