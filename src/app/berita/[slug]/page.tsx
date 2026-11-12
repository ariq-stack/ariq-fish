import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig, NewsItem } from "@/config/site";
import ArticleContent from "./ArticleContent";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return siteConfig.initialNews.map((news) => ({
    slug: news.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = siteConfig.initialNews.find((n) => n.slug === params.slug);
  if (!article) {
    return {
      title: `Warta Tidak Ditemukan | ${siteConfig.name}`,
    };
  }

  return {
    title: `${article.title} | ${siteConfig.name}`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | ${siteConfig.name}`,
      description: article.excerpt,
      images: [
        {
          url: article.thumbnail,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = siteConfig.initialNews.find((n) => n.slug === params.slug);

  if (!article) {
    notFound();
  }

  const relatedNews = siteConfig.initialNews
    .filter((n) => n.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#fef8f4] flex flex-col selection:bg-[#cbe4ff] selection:text-[#00507d]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <ArticleContent article={article} relatedNews={relatedNews} />
      </main>

      <Footer />
    </div>
  );
}

