import { Container } from "@/components/layouts/container"
import { MetaHead } from "@/components/layouts/metahead"

const TestPage = () => {
  return (
    <>
      <MetaHead title="Test" />
      <div className="">
        <Container className="space-y-4 py-10"></Container>
      </div>
    </>
  )
}

export default TestPage
