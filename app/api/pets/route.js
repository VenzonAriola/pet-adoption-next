import dbConnect from '@/lib/mongodb';
import Pet from '../../../models/pets';

export async function GET(req) {
  await dbConnect();
  try {
    const pets = await Pet.find({});

    return new Response(JSON.stringify({ success: true, data: pets }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
    });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();

    const pet = await Pet.create(body);

    return new Response(JSON.stringify({ success: true, data: pet }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
    });
  }
}
