"use client";
import { css } from "@emotion/react";
import { memo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { media } from "@/app/css/media";
import { useTransition } from "@/app/providers";
import Logo from "@/app/components/layout/Logo";
const styles = {
  container: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 66px;
    display: flex;
    gap: 12px;
    background: #18181833;
    box-shadow: 0px 0.5px 0px 0px #000000cc inset;
    ${media.tabletUp(css`
      flex-direction: column;
      height: auto;
      padding: 40px 0;
    `)}
    backdrop-filter: blur(51px);
  `,
  navItem: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
  `,
};
const navItems = [
  { url: "/search", name: "Home" },
  { url: "/tags", name: "Tags" },
];

export const Nav = memo(function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const { setSlideDirection } = useTransition();

  return (
    <div css={styles.container}>
      <div
        css={css`
          display: none;
          ${media.tabletUp(
            css`
              display: block;
              margin-bottom: 30px;
            `
          )}
        `}
      >
        <Logo />
      </div>
      {navItems.map((nav) => (
        <div
          key={nav.url}
          css={styles.navItem}
          onClick={() => {
            setSlideDirection("right");
            router.push(nav.url);
          }}
        >
          {/* not using any tool, just only one svg in this project */}
          <svg
            css={css`
              cursor: pointer;
              fill: ${pathname.includes(nav.url) ? "#ffffff" : "#6a6a6a"};
            `}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.34146 2C7.51304 2 6.84146 2.67157 6.84146 3.5C6.84146 4.32843 7.51304 5 8.34146 5H18.7578V14.4233C18.7578 15.2518 19.4294 15.9233 20.2578 15.9233C21.0863 15.9233 21.7578 15.2518 21.7578 14.4233V4.5C21.7578 3.11929 20.6386 2 19.2578 2H8.34146ZM4 6.91463H15.122C16.2265 6.91463 17.122 7.81007 17.122 8.91463V20.0366C17.122 21.1412 16.2265 22.0366 15.122 22.0366H4C2.89543 22.0366 2 21.1412 2 20.0366V8.91464C2 7.81007 2.89543 6.91463 4 6.91463Z"
            />
          </svg>
          <div
            css={css`
              visibility: hidden;
              font-size: 12px;
              ${media.tabletUp(
                css`
                  visibility: ${pathname.includes(nav.url)
                    ? "visible"
                    : "hidden"};
                `
              )}
            `}
          >
            {nav.name}
          </div>
        </div>
      ))}
    </div>
  );
});
