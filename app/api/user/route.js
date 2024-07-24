import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { runMiddleware, authMiddleware } from '../auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/user';

export async function GET(request) {
  const res = new NextResponse();
  await runMiddleware(request, res, authMiddleware);

  if (res.status) return res; // If middleware responded with an error, return it

  const user = request.user;
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  console.log('User Details:', user); // Log user details for debugging

  const userDetails = {
    email_address: user.email,
    phoneNumber: user.phone,
    first_name: user.firstName,
    last_name: user.lastName,
  };

  return NextResponse.json(userDetails, { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  /*try {
    const body = await req.json();

    const user = await User.create(body);

    return new Response(JSON.stringify({ success: true, data: user }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
    });
  } */
}
