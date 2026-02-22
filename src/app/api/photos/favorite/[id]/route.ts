import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ErrorMessages } from '@/lib/errors';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try{
    const { id: idParam } = await params;
    const id = Number.parseInt(idParam, 10);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: ErrorMessages.INVALID_ID }, { status: 400 });
    }

    const payload = await request.json();

    const updated = await prisma.photo.update({
      where: { id },
      select: { isFavorite: true },
      data: { isFavorite: payload.isFavorite },
    });

    return NextResponse.json({ isFavorite: updated.isFavorite }, { status: 200 });
  } catch (err: unknown) {
    if (
      typeof err === 'object' && err !== null && 'code' in err && err.code === 'P2025'
    ) {
      return NextResponse.json({ error: ErrorMessages.NOT_FOUND }, { status: 404 });
    }

    console.error(err);
    return NextResponse.json({ error: ErrorMessages.SERVER_ERROR }, { status: 500 });
  }
}