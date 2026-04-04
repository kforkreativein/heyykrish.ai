import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import OSCard from "@/components/OSCard";
import ResourceDetailClient from "./ResourceDetailClient";

// Import at top level for static analysis
import { resources, getResourceBySlug } from "@/data/resources";

// Generate static params for all resources
export function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
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

  return (
    <ResourceDetailClient 
      resource={resource} 
      formattedDate={formattedDate}
    />
  );
}
