import React, { useState, memo } from "react";
import { css, keyframes } from "@emotion/react";
import { ReactProps } from "@/types/global-interface";
import { Result } from "@/app/store/resultStore";
import { useSnapshot } from "valtio";
import { searchParamStore } from "@/app/store/searchParamStore";

const shimmerKeyframes = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;
const styles = {
  cardCss: css`
    width: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  `,
  imageWrapperCss: css`
    position: relative;
    width: 100%;
    aspect-ratio: 1.5;
  `,
  loadingCss: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #707070 25%, #606060 50%, #707070 75%);
    background-size: 200% 100%;
    animation: ${shimmerKeyframes} 5s infinite;
  `,
  imageCss: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;

    &.loaded {
      opacity: 1;
    }
  `,
  contentCss: css`
    padding: 12px 0;
  `,
  titleCss: css`
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 4px 0;
  `,
  usernameCss: css`
    font-size: 14px;
    color: #666;
    margin: 0;
  `,
};

const SearchResultItem = memo<ReactProps<{ datum: Result }>>(
  function SearchResultItem({ datum }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const { q } = useSnapshot(searchParamStore);

    const handleImageLoad = () => {
      setIsLoaded(true);
    };

    return (
      <div css={styles.cardCss}>
        <div css={styles.imageWrapperCss}>
          {!isLoaded && <div css={styles.loadingCss} />}
          <img
            css={styles.imageCss}
            className={isLoaded ? "loaded" : ""}
            src={datum.url}
            alt={datum.title}
            onLoad={handleImageLoad}
          />
        </div>
        <div css={styles.contentCss}>
          <h3 css={styles.titleCss}>{datum.title + "_ " + q}</h3>
          <p css={styles.usernameCss}>by {datum.username}</p>
        </div>
      </div>
    );
  }
);

export default SearchResultItem;
