import { readFile } from 'node:fs/promises';
import path from 'node:path';

const uploadRoot = path.resolve(process.cwd(), 'storage', 'uploads');

const contentTypeByExt: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.bmp': 'image/bmp',
};

const isSafeSegment = (segment: string): boolean => segment.length > 0 && segment !== '.' && segment !== '..';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const thisPath: string[] = (await params).path;

  if (thisPath.length === 0 || thisPath.some((part) => !isSafeSegment(part))) {
    return new Response('Invalid path', { status: 400 });
  }
  const totalPath = path.join(uploadRoot, ...thisPath) ;
  try {
    const file = await readFile(totalPath);
    const extension = path.extname(totalPath).toLowerCase();
    const contentType = contentTypeByExt[extension] ?? 'application/octet-stream';

    return new Response(file, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
