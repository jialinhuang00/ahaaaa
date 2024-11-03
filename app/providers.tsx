"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type TransitionContextType = {
  slideDirection: "left" | "right" | "none";
  setSlideDirection: (direction: "left" | "right" | "none") => void;
  isMobile: boolean;
};

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [slideDirection, setSlideDirection] = useState<
    "left" | "right" | "none"
  >("none");
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkMobile();

    // monitor window's width
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // check if routing/navigation
  useEffect(() => {
    if (!isMobile) return; // if tabletup, do ignore transition

    const container = document.querySelector<HTMLDivElement>(
      "[data-transition-container]"
    );
    if (container && slideDirection !== "none") {
      // reset
      container.style.transition = "none";
      container.style.transform = `translateX(${
        slideDirection === "right" ? "100%" : "-100%"
      })`;

      // force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      container.offsetHeight;

      // do animation
      container.style.transition = "transform 0.2s 0.1s ease-out ";
      container.style.transform = "translateX(0)";
    }
  }, [pathname, slideDirection, isMobile]);

  return (
    <TransitionContext.Provider
      value={{ slideDirection, setSlideDirection, isMobile }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}
