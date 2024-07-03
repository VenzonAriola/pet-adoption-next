import Pets from '@/components/pets';

async function getData() {
  const res = await fetch('http://localhost:3000/api/pets');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function PetsPage() {
  const { data } = await getData();

  return (
    <div className='flex flex-col gap-8'>
      <Pets data={data} />
    </div>
  );
}
