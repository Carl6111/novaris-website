import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praxisnahe Artikel zu Websites, Sichtbarkeit (SEO & GEO) und Anfrage-Automatisierung für lokale Unternehmen.",
  alternates: { canonical: "/blog" },
};

const dateFmt = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default function BlogPage() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />
      <header className="page-head">
        <Reveal>
          <div className="label-mono">Blog</div>
          <h1 className="section-title">Einblicke & Praxis</h1>
          <p className="section-sub">
            Artikel zu Websites, Sichtbarkeit und Anfrage-Automatisierung —
            ohne Buzzword-Salat.
          </p>
        </Reveal>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="blog-grid">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
            >
              <span className="blog-card-cat">{post.category}</span>
              <span className="blog-card-title">{post.title}</span>
              <span className="blog-card-excerpt">{post.excerpt}</span>
              <span className="blog-card-date">
                {dateFmt.format(new Date(post.date))}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
