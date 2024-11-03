"use client";
import { memo } from "react";
import { useSnapshot } from "valtio";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useTransition } from "@/app/providers";
import { Button } from "@/app/components/Base/Button";
import { Slider } from "@/app/components/Slider";
import { Input } from "@/app/components/Base/Input";
import { media } from "@/app/css/media";
import { searchParamStore } from "@/app/store/searchParamStore";

const SearchDashboard = memo(function SearchDashboard() {
  const router = useRouter();
  const { q, n } = useSnapshot(searchParamStore);
  const { setSlideDirection } = useTransition();

  const handleSearch = () => {
    setSlideDirection("right");
    router.push(`/search/results?n=${n}&q=${q}`);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 20px 20px 0;
        height: 100%;
        color: white;
        ${media.tabletUp(
          css`
            height: 100vh;
            padding: 64px;
          `
        )}
      `}
    >
      <div
        css={css`
          color: #ff6b00;
          margin-bottom: 30px;
          ${media.tabletUp(
            css`
              display: none;
            `
          )}
        `}
      >
        LOGO
      </div>
      <div
        css={css`
          margin-bottom: 40px;
        `}
      >
        <h1
          css={css`
            font-size: 24px;
            font-weight: 400;
            margin-bottom: 20px;
          `}
        >
          Search
        </h1>

        <Input
          onChange={(e) => (searchParamStore.q = e.target.value)}
          label={""}
        />
      </div>

      <div>
        <h1
          css={css`
            font-size: 24px;
            font-weight: 400;
            margin-bottom: 20px;
          `}
        >
          # Of Results Per Page
        </h1>
        <Slider
          defaultValue={0}
          onChange={(value) => {
            searchParamStore.n = value;
          }}
        />
      </div>

      <div
        css={css`
          margin-top: auto;
          margin-bottom: 40px;
          ${media.tabletUp(
            css`
              margin-bottom: 0;
              width: 340px;
            `
          )}
        `}
      >
        <Button onClick={handleSearch} fullwidth size="large">
          Search
        </Button>
      </div>
    </div>
  );
});

export default SearchDashboard;
