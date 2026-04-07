/**
 * Estimate reading time for HTML content
 * Average reading speed: 200-250 words per minute
 * We use 200 WPM for technical content (slower reading)
 */
export function estimateReadingTime(htmlContent: string): number {
  if (!htmlContent) return 0;
  
  // Strip HTML tags
  const textContent = htmlContent.replace(/<[^>]*>/g, " ");
  
  // Count words (split by whitespace)
  const words = textContent.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;
  
  // Calculate minutes (200 WPM for technical content)
  const minutes = Math.ceil(wordCount / 200);
  
  return Math.max(1, minutes); // Minimum 1 minute
}

/**
 * Format reading time for display
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) return "1 min read";
  return `${minutes} min read`;
}
