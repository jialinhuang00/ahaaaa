import { proxy } from "valtio";

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

type TabType = "followers" | "following";

const API_ENDPOINT = "https://avl-frontend-exam.herokuapp.com/api/users";
const ITEMS_PER_PAGE = 5;

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

    try {
      const endpoint =
        followStore.currentTab === "followers"
          ? `${API_ENDPOINT}/all?page=${followStore.page}&pageSize=${ITEMS_PER_PAGE}`
          : `${API_ENDPOINT}/friends?page=${followStore.page}&pageSize=${ITEMS_PER_PAGE}`;

      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);

      const newUsers = data.data || [];
      followStore.hasMore = data.total > data.pageSize * data.page;

      if (followStore.currentTab === "followers") {
        followStore.followers = [...followStore.followers, ...newUsers];
      } else {
        followStore.followingUsers = [
          ...followStore.followingUsers,
          ...newUsers,
        ];
      }

      followStore.page += 1;
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      followStore.loading = false;
    }
  },
});
