import dbConnect from '@/lib/mongodb';
import Pet from '../../../../models/pets';
import { ObjectId } from 'mongodb';

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!ObjectId.isValid(id)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid ID' }),
      {
        status: 400,
      }
    );
  }

  try {
    const pet = await Pet.findById(id);

    if (!pet) {
      return new Response(
        JSON.stringify({ success: false, error: 'Pet not found' }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify({ success: true, data: pet }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching pet by ID:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Error fetching pet' }),
      {
        status: 500,
      }
    );
  }
}
