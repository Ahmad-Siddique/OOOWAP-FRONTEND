import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../../auth.config'; // Adjust the import path as necessary

export async function POST(request: Request) {
  // Get the current session
  const session = await getServerSession(authConfig);

  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Update session data
    session.user.firstName = data.firstName; // Update as per your data structure
    session.user.lastName = data.lastName; // Update as per your data structure
    session.user.email = data.email; // Update email or any other fields as needed

    // Optionally, you can save the session back to your database if you're using a database for session storage
    // Example: await saveSession(session); // Custom save function

    return NextResponse.json({ message: 'Session updated successfully', session }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating session', error: error.message }, { status: 500 });
  }
}
