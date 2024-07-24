import { getAuth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function authMiddleware(req, res, next) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await clerkClient.users.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(user.firstName, user.lastName);
    console.log(user.primaryEmailAddressId);

    req.user = {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      phone: user.phoneNumbers[0]?.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
