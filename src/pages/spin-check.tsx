import { Container } from "@/components/layouts/container"
import { CURRENCY_TYPE } from "@/constants/app"
import { useUserStore } from "@/hooks/stores/use-user-store"
import useUserInfo from "@/hooks/use-user-info"
import { Button } from "@/libs/ui/button"
import { Service } from "@/services/app.service"
import { formatNumber } from "@/utils/number"
import { Table } from "antd"
import moment from "moment"
import { FC, useState } from "react"
import useSWR from "swr"
interface SpinCheckProps {}

export const SpinCheck: FC<SpinCheckProps> = () => {
  const [page, setPage] = useState(1)

  const { token } = useUserStore()
  const { data, mutate } = useSWR(["get-spin-history", token], async () => {
    const response = await Service.spin.getHistory({ limit: 10, offset: 0 })
    return response
  })

  const { userBalance, mutateUserBalance } = useUserInfo()

  return (
    <div>
      <Container>
        <Button
          onClick={async () => {
            const spinRes = await Service.spin.spinWheel()
            if (spinRes) {
              mutate()
              mutateUserBalance()
              return
            }
          }}
        >
          Spin({userBalance?.spin})
        </Button>

        <div className="mt-4">
          <Table
            columns={[
              {
                title: "Reward",
                width: "50%",
                dataIndex: "reward",
                key: "reward",
                render: (value) => formatNumber(+value),
              },

              {
                title: "Currency",
                width: "25%",
                dataIndex: "currency_type",
                key: "currency_type",
                render: (value) => {
                  return <div>{value === CURRENCY_TYPE.USD1 ? "USD" : "Points"}</div>
                },
              },
              {
                title: "Date",
                dataIndex: "created_time",
                width: "25%",
                key: "date",
                render: (value) => moment(value).format("YYYY-MM-DD HH:mm:ss"),
              },
            ]}
            dataSource={data?.data}
            pagination={{ current: page, onChange: (page) => setPage(page), total: data?.total }}
          />
        </div>
      </Container>
    </div>
  )
}
