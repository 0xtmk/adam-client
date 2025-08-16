import { BaseRoute } from "@/types/core.type"

export const routePath = {
  home: "/",
  comingSoon: "/coming-soon",
  notFound: "*",
  test: "/test",
  leaderboard: "/leaderboard",
  profile: "/profile",
  spinCheck: "/spin-check",
} as const

export const routes: BaseRoute[] = [
  {
    label: "Bless",
    to: routePath.home,
  },

  {
    label: "Leaderboard",
    to: routePath.leaderboard,
  },

  {
    label: "Profile",
    to: routePath.profile,
    isAuth: true,
  },
]
