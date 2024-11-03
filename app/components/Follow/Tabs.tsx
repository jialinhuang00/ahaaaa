import { memo } from "react";
import { useSnapshot } from "valtio";
import { keyframes } from "@emotion/css";
import { css } from "@emotion/react";
import { followStore } from "@/app/store/followStore";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;
const styles = {
  header: css`
    width: 100%;
    display: flex;
    margin: 16px 0;
    padding-bottom: 16px;
  `,
  headerTab: css`
    flex: 1;
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    padding: 8px 0;
    position: relative;
    transition: color 0.3s ease;

    &:hover {
      color: var(--foreground);
    }

    &.active {
      color: var(--foreground);

      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--foreground);
        animation: ${slideIn} 0.3s ease forwards;
      }
    }
  `,
  tabContent: css`
    animation: ${fadeIn} 0.3s ease forwards;
  `,
};

const Tabs = memo(function Tabs() {
  const { currentTab, setCurrentTab } = useSnapshot(followStore);

  return (
    <div css={styles.header}>
      <div
        css={styles.headerTab}
        className={currentTab === "followers" ? "active" : ""}
        onClick={() => setCurrentTab("followers")}
      >
        Followers
      </div>
      <div
        css={styles.headerTab}
        className={currentTab === "following" ? "active" : ""}
        onClick={() => setCurrentTab("following")}
      >
        Following
      </div>
    </div>
  );
});

export default Tabs;
