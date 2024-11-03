import { proxy } from "valtio";
import { followers, followingUsers } from "@/app/store/mockUsers";

interface User {
  id: string;
  fullname: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

export const followStore = proxy({
  followers: followers as User[],
  followingUsers: followingUsers as User[],
  currentTab: "followers" as TabType,
  toggleFollow: (userId: string) => {
    const user = (
      followStore.currentTab === "following"
        ? followStore.followingUsers
        : followStore.followers
    ).find((u) => u.id === userId);
    if (user) {
      user.isFollowing = !user.isFollowing;
    }
  },
  setCurrentTab: (tab: TabType) => {
    followStore.currentTab = tab;
  },
});
type TabType = "followers" | "following";
