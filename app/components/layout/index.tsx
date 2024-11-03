"use client";
import { Nav } from "@/app/components/layout/Nav";
import { media } from "@/app/css/media";
import { css } from "@emotion/react";
import Follow from "@/app/components/Follow";
import { usePathname } from "next/navigation";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isRoot = pathname === "/search";
  return (
    <div
      css={css`
        display: grid;
        grid-template-areas:
          "main"
          ${isRoot ? "'nav'" : ""};
        grid-template-columns: 1fr;
        .main,
        .nav {
          width: 100%;
        }
        .sidebar {
          display: none;
        }
        ${media.tabletUp(css`
          grid-template-areas: "nav main";
          grid-template-columns: 80px 1fr;
        `)}
        ${media.largeDesktopUp(css`
          grid-template-areas: "nav main sidebar";
          grid-template-columns: 80px 1fr 375px;
          .sidebar {
            display: block;
          }
        `)}
      `}
    >
      <div
        className="main"
        css={css`
          grid-area: main;
          height: calc(100vh - ${isRoot ? 66 : 0}px); // 66px is for nav
          ${media.tabletUp(css`
            height: calc(100vh);
          `)}
        `}
      >
        {children}
      </div>
      <div
        className="nav"
        css={css`
          grid-area: nav;
          ${isRoot ? "" : "display: none;"}
          ${media.tabletUp(css`
            display: initial;
          `)}
        `}
      >
        {<Nav />}
      </div>
      <div
        css={css`
          grid-area: sidebar;
        `}
        className="sidebar"
      >
        <Follow />
      </div>
    </div>
  );
}
