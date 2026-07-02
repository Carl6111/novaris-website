import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { POSTS, getPost } from "@/lib/posts";
import { SITE } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

const dateFmt = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${SITE.url}/blog/${post.slug}`,
    author: { "@type": "Person", name: SITE.legalName },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />

      <header className="page-head">
        <Reveal>
          <div className="label-mono">{post.category}</div>
          <h1 className="section-title" style={{ maxWidth: "20ch" }}>
            {post.title}
          </h1>
          <p className="blog-card-date">
            {dateFmt.format(new Date(post.date))}
          </p>
        </Reveal>
      </header>

      <article className="section" style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="prose">
            {post.body.map((block, i) =>
              block.type === "h2" ? (
                <h2 key={i}>{block.text}</h2>
              ) : (
                <p key={i}>{block.text}</p>
              ),
            )}
            <Link href="/kontakt" className="btn-primary">
              Erstgespräch vereinbaren
            </Link>
          </div>
        </Reveal>
      </article>
    </>
  );
}
