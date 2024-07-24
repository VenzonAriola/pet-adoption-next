import dbConnect from '@/lib/mongodb';
import Pet from '../../../../models/pets';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  await dbConnect();
  const pets = await Pet.findOne({ _id: id });
  return NextResponse.json({ pets }, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    petType: newpetType,
    name: newName,
    age: newAge,
    breed: newBreed,
    location: newLocation,
    ptraits: newptraits,
    photo: newPhoto,
  } = await request.json();
  await dbConnect();
  await Pet.findByIdAndUpdate(id, {
    newpetType,
    newName,
    newAge,
    newBreed,
    newLocation,
    newptraits,
    newPhoto,
  });
  return NextResponse.json({ message: 'Pets Updated' }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await dbConnect();
  await Pet.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Pet Deleted' }, { status: 200 });
}
