import React, { useState, useCallback, memo } from "react";
import { css, keyframes } from "@emotion/react";
import { ReactProps } from "@/types/global-interface";
import { Result } from "@/app/store/resultStore";
import { useSnapshot } from "valtio";
import { searchParamStore } from "@/app/store/searchParamStore";

// 新增載入動畫
const shimmerKeyframes = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const cardCss = css`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const imageWrapperCss = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1.5;
`;

const loadingCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #707070 25%, #606060 50%, #707070 75%);
  background-size: 200% 100%;
  animation: ${shimmerKeyframes} 5s infinite;
`;

const imageCss = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.loaded {
    opacity: 1;
  }
`;

const contentCss = css`
  padding: 12px 0;
`;

const titleCss = css`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

const usernameCss = css`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const SearchResultItem = memo<ReactProps<{ datum: Result }>>(
  function SearchResultItem({ datum }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const { q } = useSnapshot(searchParamStore);

    const handleImageLoad = () => {
      setIsLoaded(true);
    };

    return (
      <div css={cardCss}>
        <div css={imageWrapperCss}>
          {!isLoaded && <div css={loadingCss} />}
          <img
            css={imageCss}
            className={isLoaded ? "loaded" : ""}
            src={datum.url}
            alt={datum.title}
            onLoad={handleImageLoad}
          />
        </div>
        <div css={contentCss}>
          <h3 css={titleCss}>{datum.title + "_ " + q}</h3>
          <p css={usernameCss}>by {datum.username}</p>
        </div>
      </div>
    );
  }
);

export default SearchResultItem;
