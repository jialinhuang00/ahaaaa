import React, { memo } from "react";
import { css } from "@emotion/react";
import { ReactProps } from "@/types/global-interface";

const styles = {
  tag: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  tagLabelContainer: css`
    width: 150px;
    height: 150px;
    margin-bottom: 12px;
    display: flex;
    align-items: flex-end;
    background-color: #262626;
    border-radius: 10px;
    padding: 16px 12px;
  `,
  tagLabel: css`
    display: inline-block;
    padding: 8px 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 24px;
    font-weight: 700;
    border: 4px solid #fff;
    border-radius: 4px;
  `,
  count: css`
    font-size: 12px;
    color: #9ca3af;
  `,
};

const TagItem = memo<ReactProps<{ label: string; count: number }>>(
  function TagItem({ label, count }) {
    return (
      <div css={styles.tag}>
        <div css={styles.tagLabelContainer}>
          <span css={styles.tagLabel}>{label}</span>
        </div>
        <div>{label}</div>
        <div css={styles.count}>{count} Questions</div>
      </div>
    );
  }
);

export default TagItem;
