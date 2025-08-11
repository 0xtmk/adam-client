import defaultTheme from "tailwindcss/defaultTheme"
import { ThemeConfig } from "tailwindcss/types/config"

export const tailwindExtend: Partial<ThemeConfig> = {
  fontFamily: {
    sans: ["NeueMachina", ...defaultTheme.fontFamily.sans],
    neueMachinaBold: ["NeueMachina-Bold", ...defaultTheme.fontFamily.sans],
    neueMachinaUltrabold: ["NeueMachina-Ultrabold", ...defaultTheme.fontFamily.sans],
  },
  screens: {
    default: "1412px",
    mobile: "390px",
    tablet: "820px",
    hd: "1366px",
    retina: "1440px",
    fhd: "1920px",
    qhd: "2560px",
    uhd: "3840px",
  },
  borderRadius: {
    DEFAULT: "0.375rem",
  },
  colors: {},
  backgroundImage: {
    "btn-2": "url(/images/bg-btn-2.png)",
    leaderboard: "url(/images/bg-leaderboard.png)",
    menu: "url(/images/bg-menu.png)",
    "leaderboard-mobile": "url(/images/bg-leaderboard-mobile.png)",
    "radient-1": "radial-gradient(31.14% 82.63% at 20.69% 36.77%, #F3EDE9 19.66%, #E9E0DA 100%)",
    "btn-3": "url(/images/bg-btn-3.png)",
  },
  boxShadow: {
    "inset-1": "-4px 4px 0px 0px rgba(255, 255, 255, 0.25) inset",
  },
  transitionTimingFunction: {
    expo: "cubic-bezier(0.5, 1.5, 0.8, 1)",
    "expo-in": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
    "expo-out": "cubic-bezier(0.19, 1, 0.22, 1)",
  },
}
