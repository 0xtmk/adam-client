/* eslint-disable react-refresh/only-export-components */
import React, { ComponentType } from "react"
import { EmptyData } from "../layouts/empty/empty-data"
import { CardSkeleton } from "../layouts/loading/card-skeleton"
import { DefaultSkeleton } from "../layouts/loading/default-skeleton"

type SkeletonType = "card" | "default"

const Skeletons: Record<SkeletonType, React.FC> = {
  card: () => <CardSkeleton />, // @TODO: Add skeleton card
  default: () => <DefaultSkeleton />, // @TODO: Add skeleton default
}

interface HOCProps<K> {
  isLoading: boolean
  data?: K
}

function withPreRenderComponent<T extends object, K>(
  WrappedComponent: ComponentType<T & { data: K }>,
  skeletonType: SkeletonType = "default",
) {
  function EnhancedComponent(props: T & HOCProps<K>) {
    const { isLoading, data, ...restProps } = props

    if (isLoading) {
      const Skeleton = Skeletons[skeletonType] || Skeletons.default
      return <Skeleton />
    }

    const isDataEmpty = !data || (Array.isArray(data) && data.length === 0)

    if (isDataEmpty) {
      return <EmptyData />
    }

    return <WrappedComponent {...(restProps as T)} data={data} />
  }

  EnhancedComponent.displayName = `withPreRenderComponent(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`

  return EnhancedComponent
}

export default withPreRenderComponent
