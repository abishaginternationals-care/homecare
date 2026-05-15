import { deleteAllReviews } from '../../../actions';
import { NextResponse } from 'next/server';

export async function GET() {
  const result = await deleteAllReviews();
  if (result.success) {
    return NextResponse.json({ message: 'All reviews deleted successfully.' });
  } else {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
}
