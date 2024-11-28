import { NextResponse } from 'next/server';
import { Company } from '../../enum/Types';


export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL}/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const data: Company[] = await response.json();

    if ('errors' in data) {
      return NextResponse.json(data, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error(error);
    return NextResponse.json({ errors: [{ message: errorMessage }] }, { status: 500 });
  }
}