import React from "react";
import { proxy, useSnapshot } from "valtio";
import { css } from "@emotion/react";
import { Button } from "@/app/components/Base/Button";
import { followStore } from "@/app/store/followStore";
import Tabs from "@/app/components/Follow/Tabs";

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
};

const Follow: React.FC = () => {
  const { followers, followingUsers, currentTab, toggleFollow, setCurrentTab } =
    useSnapshot(followStore);

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
      </div>
    </div>
  );
};

export default Follow;
