import { BaseRoute } from "@/types/core.type"

export const routePath = {
  home: "/",
  comingSoon: "/coming-soon",
  notFound: "*",
  test: "/test",
  leaderboard: "/leaderboard",
} as const

export const routes: BaseRoute[] = [
  // {
  //   label: "Home",
  //   to: routePath.home,
  // },

  {
    label: "Bless",
    to: routePath.home,
  },

  {
    label: "Leaderboard",
    to: routePath.leaderboard,
  },
]
