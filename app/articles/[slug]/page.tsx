import { Article } from "@/components/article";
import { kv } from "@vercel/kv";
import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: Readonly<{
  params: { slug: string };
}>) {
  const markdown = await kv.get<string>(params.slug);

  if (!markdown) notFound();

  return (
    <main className="flex flex-col items-center justify-between gap-6 px-6 py-10 md:gap-8">
      <Article>{markdown}</Article>
    </main>
  );
}
