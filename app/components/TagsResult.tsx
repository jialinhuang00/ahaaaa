"use client";
import { css } from "@emotion/react";
import { media } from "@/app/css/media";
import { RouteBack } from "@/app/components/RouteBack";

export default function TagsResult() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 20px 20px 0;
        color: white;
        ${media.tabletUp(
          css`
            height: 100vh;
            padding: 64px;
          `
        )}
      `}
    >
      <RouteBack />

      <h2
        css={css`
          font-size: 20px;
          margin-bottom: 20px;
        `}
      >
        Tags
      </h2>
    </div>
  );
}
