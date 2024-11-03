import { useRouter } from "next/navigation";
import { memo } from "react";
import { useTransition } from "@/app/providers";
import { css } from "@emotion/react";

export const RouteBack = memo(function RouteBack() {
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
          background: none;
          border: none;
          color: white;
          font-size: 24px;
        `}
      >
        ←
      </button>
      <h1
        css={css`
          font-size: 24px;
        `}
      >
        Home Page
      </h1>
    </div>
  );
});
