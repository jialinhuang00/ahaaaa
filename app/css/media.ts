import { CSSInterpolation } from "@emotion/css/create-instance";
import { css } from "@emotion/react";

export const breakpoints = {
  mobile: 600,
  tablet: 900,
  desktop: 1024,
  lgDesktop: 1440,
};

export const media = {
  mobile: (styles: CSSInterpolation) => css`
    @media (max-width: ${breakpoints.mobile}px) {
      ${styles}
    }
  `,
  tabletUp: (styles: CSSInterpolation) => css`
    @media (min-width: ${breakpoints.mobile}px) {
      ${styles}
    }
  `,
  desktopUp: (styles: CSSInterpolation) => css`
    @media (min-width: ${breakpoints.tablet}px) {
      ${styles}
    }
  `,
  largeDesktopUp: (styles: CSSInterpolation) => css`
    @media (min-width: ${breakpoints.lgDesktop}px) {
      ${styles}
    }
  `,
};
export const sysdark = (styles: CSSInterpolation) => css`
  @media (prefers-color-scheme: dark) {
    ${styles}
  }
`;
