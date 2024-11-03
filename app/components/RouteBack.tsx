import { useRouter } from "next/navigation";
import { memo } from "react";
import { useTransition } from "@/app/providers";
import { css } from "@emotion/react";
import { ReactProps } from "@/types/global-interface";

export const RouteBack = memo<
  ReactProps<{ title: string; showArrow?: boolean }>
>(function RouteBack({ title, showArrow }) {
  const router = useRouter();
  const { setSlideDirection, isMobile } = useTransition();

  const handleBack = () => {
    if (isMobile) {
      setSlideDirection("none");
    }
    router.back();
  };
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        gap: 10px;
      `}
    >
      <button
        onClick={handleBack}
        css={css`
          cursor: pointer;
          display: flex;
          gap: 14px;
          background: none;
          border: none;
          color: white;
          font-size: 24px;
        `}
      >
        {showArrow && <span>&lt;</span>}
        <h1
          css={css`
            font-size: 24px;
          `}
        >
          {title}
        </h1>
      </button>
    </div>
  );
});
