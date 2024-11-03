import { useRouter } from "next/navigation";
import { memo } from "react";
import { useTransition } from "@/app/providers";
import { css } from "@emotion/react";
import { ReactProps } from "@/types/global-interface";

const styles = {
  container: css`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
  `,
  button: css`
    cursor: pointer;
    display: flex;
    gap: 14px;
    background: none;
    border: none;
    color: white;
    font-size: 24px;
  `,
  title: css`
    font-size: 24px;
  `,
};

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
    <div css={styles.container}>
      <button onClick={handleBack} css={styles.button}>
        {showArrow && <span>&lt;</span>}
        <h1 css={styles.title}>{title}</h1>
      </button>
    </div>
  );
});
