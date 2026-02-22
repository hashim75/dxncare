import { NextResponse } from 'next/server';
import { getMedicinesByLetter } from '../../lib/medicine-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const letter = searchParams.get('letter') || 'a';
  
  try {
    const data = getMedicinesByLetter(letter);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}