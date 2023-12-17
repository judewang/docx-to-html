import { NextRequest, NextResponse } from "next/server";
import { convertToHtml } from "mammoth";
import { kv } from "@vercel/kv";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 使用 mammoth 將 .docx 檔案轉換為 HTML
  const result = await convertToHtml({ buffer });
  const html = result.value;
  const today = new Date();
  const key = `sermon-${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  await kv.set(key, html);

  return NextResponse.redirect(`/articles/${key}`);
}
