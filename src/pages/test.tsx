import { Container } from "@/components/layouts/container"
import { MetaHead } from "@/components/layouts/metahead"
import { Button } from "@/libs/ui/button"
import { Service } from "@/services/app.service"
import useSWR from "swr"

const TestPage = () => {

  useSWR(['get-data'] , async () => {
    const res = await Service.mission.getListMissions()
    console.log('res', res)
  })

  return (
    <>
      <MetaHead title="Test" />
      <Container className="">
        <Button
          onClick={async () => {
            const res = await Service.common.getTwitterUrl()
            if (res) {
              window.open(res)
            }
            console.log("res", res)
          }}
        >
          avc
        </Button>
        <Button
          onClick={async () => {
            await Service.common.logoutTwitter()
          }}
        >
          logout
        </Button>
      </Container>
    </>
  )
}

export default TestPage
