import withInfiniteScroll from "@/components/hoc/infinity-scroll"
import React, { useState } from "react"

interface ExampleProps {
  items: string[]
}

const Example: React.FC<ExampleProps> = ({ items }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
)

const InfiniteScrollList = withInfiniteScroll(Example)

const InfinityScrollWrapper: React.FC = () => {
  const [items, setItems] = useState<string[]>(Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`))
  const [hasMore, setHasMore] = useState<boolean>(true)

  const loadMore = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newItems = Array.from({ length: 10 }, (_, i) => `Item ${items.length + i + 1}`)
        setItems((prev) => [...prev, ...newItems])
        if (items.length + newItems.length >= 50) setHasMore(false)
        resolve()
      }, 1000)
    })
  }

  return <InfiniteScrollList items={items} loadMore={loadMore} hasMore={hasMore} />
}

export default InfinityScrollWrapper
