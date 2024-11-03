"use client";
import { useSnapshot } from "valtio";
import { useCallback, useState } from "react";
import { css } from "@emotion/react";
import { media } from "@/app/css/media";
import { RouteBack } from "@/app/components/RouteBack";
import { resultStore } from "@/app/store/resultStore";
import { Button } from "@/app/components/Base/Button";
import SearchResultItem from "@/app/components/SearchDashboard/SearchResultItem";
import { searchParamStore } from "@/app/store/searchParamStore";

const PAGE_DEFAULT_SIZE = 9;

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    padding: 20px 20px 0;
    color: white;

    ${media.tabletUp(
      css`
        height: 100vh;
        padding: 64px;
        overflow: auto;
      `
    )}
  `,
  resultContainer: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    padding: 24px 0;
  `,
  action: css`
    margin-top: auto;
    margin-bottom: 40px;
    ${media.tabletUp(
      css`
        margin-bottom: 0;
        width: 340px;
      `
    )}
  `,
};
export default function SearchResult() {
  const { results } = useSnapshot(resultStore);
  const { n } = useSnapshot(searchParamStore);

  const [page, setPage] = useState(1);
  const displayedItems = useCallback(
    () => results.slice(0, Math.min(page * PAGE_DEFAULT_SIZE, n)),
    [results, page]
  );

  const visibleItems = displayedItems();

  const hasMore = Math.min(results.length, n) > page * PAGE_DEFAULT_SIZE;
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div css={styles.container}>
      <RouteBack title="Result" showArrow={true} />

      <div css={styles.resultContainer}>
        {visibleItems.map((datum) => (
          <SearchResultItem key={`${datum.id}_${datum.title}`} datum={datum} />
        ))}
      </div>
      {hasMore && (
        <div css={styles.action}>
          <Button fullwidth onClick={loadMore} size="large">
            More
          </Button>
        </div>
      )}
    </div>
  );
}
