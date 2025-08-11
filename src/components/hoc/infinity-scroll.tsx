import { ComponentType, useEffect, useRef, useState } from "react"

interface InfiniteScrollProps {
  loadMore: () => Promise<void>
  hasMore: boolean
  threshold?: number
}

// @Options note:
// If fast scrolling, set threshold higher (300-500px) to avoid delays.
// If small data chunks, use threshold: 100px or 0px for precise control.

const withInfiniteScroll = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return function InfiniteScrollWrapper(props: P & InfiniteScrollProps) {
    const { loadMore, hasMore, threshold = 300 } = props
    const [isFetching, setIsFetching] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
      if (!hasMore || isFetching) return

      const handleObserver = (entries: IntersectionObserverEntry[]) => {
        const target = entries[0]
        if (target.isIntersecting && !isFetching) {
          setIsFetching(true)
          loadMore().finally(() => setIsFetching(false))
        }
      }

      observerRef.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: `0px 0px ${threshold}px 0px`,
        threshold: 1.0,
      })

      const sentinel = document.getElementById("infinite-scroll-sentinel")
      if (sentinel) observerRef.current.observe(sentinel)

      return () => {
        observerRef.current?.disconnect()
      }
    }, [hasMore, isFetching, loadMore, threshold])

    return (
      <>
        <WrappedComponent {...(props as P)} />
        {hasMore && <div id="infinite-scroll-sentinel" style={{ height: "1px" }} />}
        {/* @TODO: Add loading component */}
        {isFetching && <p>Loading more...</p>}
      </>
    )
  }
}

export default withInfiniteScroll
