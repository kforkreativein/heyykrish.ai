import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Import at top level for static analysis
import { resources, getResourceBySlug, getRelatedResources } from "@/data/resources";
import { estimateReadingTime, formatReadingTime } from "@/lib/reading-time";
import ResourceDetailClient from "./ResourceDetailClient";

// Generate static params for all resources
export function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

// Generate metadata for each resource page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  
  if (!resource) {
    return { title: "Resource Not Found" };
  }
  
  return {
    title: resource.title,
    description: resource.description,
    openGraph: {
      title: `${resource.title} | HeyyKrish.AI`,
      description: resource.description,
      type: "article",
      publishedTime: resource.publishedAt,
    },
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  // Format date
  const formattedDate = new Date(resource.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long", 
      day: "numeric",
    }
  );

  // Calculate reading time
  const readingTime = resource.contentHtml 
    ? formatReadingTime(estimateReadingTime(resource.contentHtml))
    : null;

  // Get related resources
  const relatedResources = getRelatedResources(slug, resource.category, 3);

  return (
    <ResourceDetailClient 
      resource={resource} 
      formattedDate={formattedDate}
      readingTime={readingTime}
      relatedResources={relatedResources}
    />
  );
}
