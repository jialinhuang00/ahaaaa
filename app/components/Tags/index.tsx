"use client";
import { css } from "@emotion/react";
import { media } from "@/app/css/media";
import { RouteBack } from "@/app/components/RouteBack";
import TagItem from "@/app/components/Tags/TagItem";

const mockTags = [
  { id: 1, label: "Cool", count: 350 },
  { id: 2, label: "Beautiful", count: 210 },
  { id: 3, label: "Easy", count: 190 },
  { id: 4, label: "Summary", count: 105 },
  { id: 5, label: "Hot", count: 80 },
  { id: 6, label: "Passage Specific", count: 50 },
  { id: 7, label: "Very long taaaaaaag", count: 50 },
  { id: 8, label: "Tag", count: 50 },
];

const containerCss = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  ${media.tabletUp(css`
    justify-content: flex-start;
  `)}
`;

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
            padding: 64px;
          `
        )}
      `}
    >
      <RouteBack title="Home page" showArrow={true} />

      <div css={containerCss}>
        {mockTags.map((tag) => (
          <TagItem
            key={`${tag.id}_${tag.label}`}
            label={tag.label}
            count={tag.count}
          />
        ))}
      </div>
    </div>
  );
}
