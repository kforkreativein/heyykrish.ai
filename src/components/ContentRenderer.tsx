"use client";

import { useEffect, useRef } from "react";

interface ContentRendererProps {
  htmlContent: string;
}

export default function ContentRenderer({ htmlContent }: ContentRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // First, remove any existing copy buttons to prevent duplicates (do this once, not per element)
    const existingButtons = containerRef.current.querySelectorAll("[data-copy-button]");
    existingButtons.forEach(btn => btn.remove());

    const preElements = containerRef.current.querySelectorAll("pre");

    preElements.forEach((preElement) => {
      let parentDiv = preElement.parentElement;
      if (!parentDiv) return;

      // Check if already wrapped (avoid double-wrapping)
      let outerWrapper = parentDiv.closest("[data-code-wrapper]");
      
      if (!outerWrapper) {
        // Create outer wrapper with proper mobile-friendly structure
        outerWrapper = document.createElement("div");
        outerWrapper.className = "relative my-6 rounded-xl border border-white/5 bg-[#121212]";
        outerWrapper.setAttribute("data-code-wrapper", "true");

        // Create inner scrolling container
        const innerContainer = document.createElement("div");
        innerContainer.className = "overflow-x-auto p-5 text-sm font-mono text-zinc-200";

        // Remove conflicting classes from existing parent if any
        if (parentDiv.classList.contains("relative")) {
          parentDiv.classList.remove("relative");
        }
        if (parentDiv.classList.contains("my-6")) {
          parentDiv.classList.remove("my-6");
        }

        // Restructure DOM: outerWrapper > innerContainer > existing parent > pre
        parentDiv.parentNode?.insertBefore(outerWrapper, parentDiv);
        outerWrapper.appendChild(innerContainer);
        innerContainer.appendChild(parentDiv);
      }

      // Check if copy button already exists in this specific wrapper
      if (outerWrapper.querySelector("[data-copy-button]")) return;

      // Create premium copy button
      const button = document.createElement("button");
      button.setAttribute("data-copy-button", "true");
      button.className = "absolute top-3 right-3 p-2 rounded-md bg-zinc-800/80 backdrop-blur text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all z-10 shadow-sm";
      button.type = "button";
      button.title = "Copy code";

      // Copy icon SVG
      button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      </svg>`;

      // Add click handler
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Get the text from the pre element, ensuring we get the actual code content
        const textToCopy = preElement.textContent || preElement.innerText;

        try {
          await navigator.clipboard.writeText(textToCopy);

          // Show checkmark
          button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-400">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>`;
          button.classList.add("text-green-400");

          // Revert after 2 seconds
          setTimeout(() => {
            button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>`;
            button.classList.remove("text-green-400");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      });

      // Insert button into the outer wrapper (NOT the scrolling container)
      outerWrapper.appendChild(button);
    });
  }, [htmlContent]);

  return (
    <div
      ref={containerRef}
      className="prose prose-dark max-w-none w-full max-w-full break-words [word-break:break-word] overflow-hidden [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_table]:max-w-full [&_table]:overflow-x-auto [&_code]:break-all [&_h1]:break-words [&_h2]:break-words [&_h3]:break-words [&_p]:break-words"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      suppressHydrationWarning={true}
    />
  );
}
