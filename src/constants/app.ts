export enum PARAMS_CODE {
  code = "code",
}

export enum MISSION_STATUS {
  UNDONE = 1,
  DONE,
}

export enum CURRENCY_TYPE {
  POINT = 1,
  USD1 = 2,
  SPIN = 3,
}

export enum WithdrawalStatus {
  REQUESTED = 1,
  DONE = 2,
  FAILED,
}

export const socials = [
  {
    image: "/icons/x.png",
    label: "Twitter",
    href: "",
  },
  {
    image: "/icons/tele.png",
    label: "Telegram",
    href: "",
  },
  {
    image: "/icons/discord.png",
    label: "Discord",
    href: "",
  },
]

export enum MissionConfigType {
  X = 1,
  TELEGRAM = 2,
  WEBSITE,
  DISCORD,
}
