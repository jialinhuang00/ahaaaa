import React, { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { css } from "@emotion/react";
import { Button } from "@/app/components/Base/Button";
import { followStore } from "@/app/store/followStore";
import Tabs from "@/app/components/Follow/Tabs";
import { keyframes } from "@emotion/css";

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

const styles = {
  container: css`
    width: 100%;
    overflow: hidden;
    height: 100vh;
  `,
  userList: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow: auto;
    padding: 0 16px 16px;
    height: calc(100vh - 66px);
  `,
  userItem: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    opacity: 0;
    animation: ${fadeIn} 0.3s ease forwards;
    &:nth-of-type(odd) {
      animation-delay: 0.15s;
    }

    &:nth-of-type(even) {
      animation-delay: 0.2s;
    }
  `,
  userInfo: css`
    display: flex;
    gap: 12px;
    align-items: center;
  `,
  avatarContainer: css`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid white;
    overflow: hidden;
  `,
  avatar: css`
    width: 100%;
    height: 100%;
    transform: scale(1.5) translateY(2px);
    object-fit: cover;
  `,
  userText: css`
    display: flex;
    flex-direction: column;
  `,
  fullname: css`
    color: #fff;
    font-weight: 700;
  `,
  username: css`
    color: #c6c6c6;
  `,
  loadingIndicator: css`
    text-align: center;
    padding: 20px;
    color: #c6c6c6;
  `,
};

const Follow: React.FC = () => {
  const {
    followers,
    followingUsers,
    currentTab,
    toggleFollow,
    fetchMoreUsers,
    loading,
    hasMore,
  } = useSnapshot(followStore);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 初次載入時取得第一頁資料
  useEffect(() => {
    if (
      (currentTab === "followers" && followers.length === 0) ||
      (currentTab === "following" && followingUsers.length === 0)
    ) {
      fetchMoreUsers();
    }
  }, [currentTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMoreUsers();
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 0,
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading]);

  return (
    <div css={styles.container}>
      <Tabs />

      <div css={styles.userList}>
        {(currentTab === "following" ? followingUsers : followers).map(
          (user) => (
            <div key={user.id} css={styles.userItem}>
              <div css={styles.userInfo}>
                <div css={styles.avatarContainer}>
                  <img
                    css={styles.avatar}
                    src={user.avatar}
                    alt={user.fullname}
                  />
                </div>
                <div css={styles.userText}>
                  <span css={styles.fullname}>{user.fullname}</span>
                  <span css={styles.username}>{user.username}</span>
                </div>
              </div>
              <Button
                variant={user.isFollowing ? "contained" : "outlined"}
                onClick={() => toggleFollow(user.id)}
              >
                {user.isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          )
        )}

        <div ref={observerTarget}>
          {loading && <div css={styles.loadingIndicator}>Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default Follow;
