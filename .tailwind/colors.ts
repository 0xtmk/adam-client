import colors from "tailwindcss/colors"
import { appendDefault } from "./utils"

const primary = {
  50: "#E9E7FE",
  100: "#D2CEFD",
  200: "#A69EFB",
  300: "#796DF9",
  400: "#4D3DF7",
  500: "#200CF5",
  600: "#1A0AC4",
  700: "#130793",
  800: "#0D0562",
  900: "#060231",
  950: "#030118",
}

// Colors should be hex code colors

const config = {
  light: {
    default: colors.stone[100],
    primary: appendDefault(colors.pink),
    body: colors.white,
    component: colors.white,
    modal: colors.white,
    table: colors.white,
    muted: colors.neutral[200],
    content: colors.black,
    invert: colors.white,
    line: appendDefault(colors.neutral),
    success: appendDefault(colors.green),
    warning: appendDefault(colors.amber),
    info: appendDefault(colors.blue),
    error: appendDefault(colors.red),
    warm: appendDefault(colors.neutral),
    cool: appendDefault(colors.gray),
  },
  dark: {
    default: colors.gray[900],
    primary: appendDefault(primary),
    body: "rgba(8,17,22,1)",
    // body: colors.gray[950],
    component: colors.gray[800],
    modal: colors.gray[800],
    table: colors.zinc[900],
    muted: colors.gray[800],
    content: colors.white,
    invert: colors.black,
    line: appendDefault(colors.gray),
    success: appendDefault(colors.green),
    warning: appendDefault(colors.amber),
    info: appendDefault(colors.blue),
    error: appendDefault(colors.red),
    warm: appendDefault(colors.neutral),
    cool: appendDefault(colors.gray),
  },
}

export default config
