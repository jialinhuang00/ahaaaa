"use client";
import { useEffect, useRef } from "react";
import { useTransition } from "@/app/providers";
import { css } from "@emotion/react";

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { slideDirection, isMobile } = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && isMobile && slideDirection !== "none") {
      containerRef.current.style.transform = "translateX(0)";
    }
  }, [isMobile, slideDirection]);

  return (
    <div
      ref={containerRef}
      data-transition-container
      css={css`
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #1a1a1a;

        ${isMobile && slideDirection !== "none"
          ? `
          transform: translateX(${
            slideDirection === "right" ? "100%" : "-100%"
          });
          transition: transform 0.3s ease-out;
          
          &:not([style*="transform"]) {
            transition: none;
          }
        `
          : ""}

        @media (min-width: 600px) {
          position: static;
          transform: none !important;
          transition: none !important;
        }
      `}
    >
      {children}
    </div>
  );
}
