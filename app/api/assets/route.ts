import { NextResponse } from 'next/server';
import { Assets } from '../../enum/Types';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId');
  if (!companyId) {
    return NextResponse.json({ errors: [{ message: 'Company ID is required' }] }, { status: 400 });
  }
  
  try {
    const response = await fetch(`${process.env.API_URL}/companies/${companyId}/assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const data: Assets[] = await response.json();

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