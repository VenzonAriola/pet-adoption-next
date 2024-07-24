import dbConnect from '@/lib/mongodb';
import Pet from '../../../models/pets';
import { getAuth } from '@clerk/nextjs/server';

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
/* post prev
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
}*/

/* post with pet data
export async function POST(req) {
  await dbConnect();

  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, message: 'Unauthorized' }),
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    body.userId = userId; // Add the userId to the body

    const pet = await Pet.create(body);

    return new Response(JSON.stringify({ success: true, data: pet }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
      }
    );
  }
}
*/

export async function POST(req) {
  await dbConnect();

  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, message: 'Unauthorized' }),
        {
          status: 401,
        }
      );
    }

    const body = await req.json();
    const { petType, name, age, breed, location, ptraits, photo } = body;

    // Validate the required fields
    if (
      !petType ||
      !name ||
      !age ||
      !breed ||
      !location ||
      !ptraits ||
      !photo
    ) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        {
          status: 400,
        }
      );
    }

    // Create a new pet with the required fields and the userId
    const newPet = {
      petType: petType,
      userId: userId,
      name: name,
      age: age,
      breed: breed,
      location: location,
      ptraits: ptraits,
      photo: photo,
    };

    const pet = await Pet.create(newPet);

    return new Response(JSON.stringify({ success: true, data: pet }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
      }
    );
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    return POST(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
export async function DELETE(request) {
  await dbConnect();
  await Pet.deleteMany({});
  return new Response(
    JSON.stringify({ success: true, message: 'Pets Deleted' })
  );
}
