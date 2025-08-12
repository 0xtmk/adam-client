import { BaseRoute } from "@/types/core.type"

export const routePath = {
  home: "/",
  comingSoon: "/coming-soon",
  notFound: "*",
  // bless: "/bless",
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
