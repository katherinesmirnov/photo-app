import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ErrorMessages } from '@/lib/errors';


export async function PATCH(request: Request,
  { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id);
    if (Number.isNaN(id)) return NextResponse.json({ error: ErrorMessages.INVALID_ID }, { status: 400 });

    const existing = await prisma.photo.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: ErrorMessages.NOT_FOUND }, { status: 404 });

    const updated = await prisma.photo.update({
      where: { id },
      select: { isFavorite: true },
      data: { isFavorite: !existing.isFavorite },
    });
    return NextResponse.json(updated.isFavorite, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: ErrorMessages.SERVER_ERROR }, { status: 500 });
  }
}
