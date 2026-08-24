import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Make filename safe and unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const safeFilename = `${uniqueSuffix}-${filename}`;

    const uploadDir = join(process.cwd(), 'public', 'uploads', 'cards');
    
    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    const filepath = join(uploadDir, safeFilename);
    await writeFile(filepath, buffer);

    const fileUrl = `/uploads/cards/${safeFilename}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: 'File upload failed' }, { status: 500 });
  }
}
