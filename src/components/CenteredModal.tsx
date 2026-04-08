"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface CenteredModalProps {
  isOpen: boolean;
  onClose: () => void;
  ariaLabelledBy: string;
  children: ReactNode;
  maxWidthClassName?: string;
}

export default function CenteredModal({
  isOpen,
  onClose,
  ariaLabelledBy,
  children,
  maxWidthClassName = "max-w-md",
}: CenteredModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isOpen || !isMounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-start sm:items-center justify-center overflow-y-auto bg-black/80 p-4 sm:p-6 backdrop-blur-sm modal-backdrop-enter"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className={`relative my-auto w-full ${maxWidthClassName} modal-content-enter`}>
        {children}
      </div>
    </div>,
    document.body
  );
}
