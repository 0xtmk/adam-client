export const CUSTOM_EVENT_NAME = {
  ReloadGame: "ReloadGame",
}

export const sendCustomEvent = <T extends string, K>(eventName: T, detail: K) => {
  if (typeof window === "undefined") return

  document.dispatchEvent(new CustomEvent(eventName, { detail }))
}

export const listenCustomEvent = <T = any>(
  eventName: string,
  handler: (
    evt: Event & { detail?: T },
  ) => (void | Promise<void>) | { handleEvent(object: Event & { detail: T }): void | Promise<void> },
  context = document,
) => {
  if (typeof window === "undefined") return

  context.addEventListener(eventName, handler)

  return () => context.removeEventListener(eventName, handler)
}
