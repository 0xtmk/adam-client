import preRenderComponent from "@/components/hoc/pre-render-compenent"
import { FC } from "react"

interface PrerenderExampleProps {
  data?: { [key: string]: any }[]
}

const RenderData: FC<PrerenderExampleProps> = ({ data }) => {
  return <div>{data?.map((item, index) => <div key={index}>{item.description}</div>)}</div>
}

const PrerenderExampleWithHOC = preRenderComponent(RenderData)

const PrerenderExample: FC<PrerenderExampleProps> = () => {
  const isLoading = false
  const data = [
    {
      id: 1,
      title: "Title 1",
      description: "Description 1",
    },
    {
      id: 2,
      title: "Title 2",
      description: "Description 2",
    },
  ]
  return <PrerenderExampleWithHOC isLoading={isLoading} data={data} />
}

export default PrerenderExample
