import { proxy } from "valtio";
import { followers, followingUsers } from "@/app/store/mockUsers";

interface User {
  id: string;
  fullname: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

type TabType = "followers" | "following";

const ITEMS_PER_PAGE = 5;

const originalData = {
  followers: [...followers],
  followingUsers: [...followingUsers],
};

export const followStore = proxy({
  followers: [] as User[],
  followingUsers: [] as User[],
  currentTab: "followers" as TabType,
  page: 1,
  loading: false,
  hasMore: true,

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
    followStore.page = 1;
    followStore.followers = [];
    followStore.followingUsers = [];
    followStore.hasMore = true;
    followStore.fetchMoreUsers();
  },

  fetchMoreUsers: async () => {
    if (followStore.loading || !followStore.hasMore) return;

    followStore.loading = true;

    // mock API fetching...
    await new Promise((resolve) => setTimeout(resolve, 700));

    const currentData =
      followStore.currentTab === "followers"
        ? originalData.followers
        : originalData.followingUsers;

    const startIndex = (followStore.page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newUsers = currentData.slice(startIndex, endIndex);

    followStore.hasMore = endIndex < currentData.length;

    if (followStore.currentTab === "followers") {
      followStore.followers = [...followStore.followers, ...newUsers];
    } else {
      followStore.followingUsers = [...followStore.followingUsers, ...newUsers];
    }

    followStore.page += 1;
    followStore.loading = false;
  },
});
