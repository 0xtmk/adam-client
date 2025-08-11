export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const retry = async <T>(
  fn: () => Promise<T>,
  {
    retries = 10,
    delay = 1000,
    onError,
  }: { retries?: number; delay?: number; onError?(err: Error, index: number): void } = {},
): Promise<T> => {
  let lastError: Error | undefined
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (e) {
      if (e instanceof Error) {
        onError?.(e, i)
        lastError = e
      }
      await sleep(delay)
    }
  }
  throw lastError
}
