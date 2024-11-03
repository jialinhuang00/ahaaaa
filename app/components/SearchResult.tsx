"use client";
import { css } from "@emotion/react";
import { media } from "@/app/css/media";
import { RouteBack } from "@/app/components/RouteBack";

export default function SearchResult() {
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
        Results
      </h2>

      {[1, 2].map((i) => (
        <div
          key={i}
          css={css`
            margin-bottom: 20px;
          `}
        >
          <h3
            css={css`
              font-size: 16px;
              margin-bottom: 5px;
            `}
          >
            This is a title
          </h3>
          <p
            css={css`
              color: #666;
              font-size: 14px;
            `}
          >
            by username
          </p>
        </div>
      ))}
    </div>
  );
}
