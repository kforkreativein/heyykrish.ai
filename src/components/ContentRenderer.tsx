"use client";

import { useEffect, useRef } from "react";

interface ContentRendererProps {
  htmlContent: string;
}

export default function ContentRenderer({ htmlContent }: ContentRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const preElements = containerRef.current.querySelectorAll("pre");

    preElements.forEach((preElement) => {
      const parentDiv = preElement.parentElement;
      if (!parentDiv) return;

      // Parent div should already have 'relative' class from the HTML
      // If not, add it to ensure proper button positioning
      if (!parentDiv.classList.contains("relative")) {
        parentDiv.classList.add("relative");
      }

      // Check if copy button already exists
      if (parentDiv.querySelector("[data-copy-button]")) return;

      // Create copy button
      const button = document.createElement("button");
      button.setAttribute("data-copy-button", "true");
      button.className =
        "absolute top-3 right-3 p-2 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all";
      button.type = "button";
      button.title = "Copy code";

      // Copy icon SVG
      button.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      </svg>`;

      // Add click handler
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const textToCopy = preElement.innerText;

        try {
          await navigator.clipboard.writeText(textToCopy);

          // Show checkmark
          button.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-400">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>`;
          button.classList.add("text-green-400");

          // Revert after 2 seconds
          setTimeout(() => {
            button.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>`;
            button.classList.remove("text-green-400");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      });

      // Insert button into the parent div
      parentDiv.insertBefore(button, preElement);
    });
  }, [htmlContent]);

  return (
    <div
      ref={containerRef}
      className="prose prose-dark max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      suppressHydrationWarning={true}
    />
  );
}
