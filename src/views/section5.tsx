import { Container } from "@/components/layouts/container"
import { ExternalLink } from "@/libs/ui/external-link"
import { Tooltip } from "antd"
import { FC } from "react"

interface Section5Props {}

const Section5: FC<Section5Props> = () => {
  return (
    <div>
      <Container size={"main"} className="flex min-h-screen items-end pb-8 pt-20">
        <div className="w-full space-y-2">
          <h1 className="text-primary-500 font-UScream text-center text-[12.5rem] leading-none max-lg:text-[5.5rem]">
            Join the Community
          </h1>
          <div className="text-secondary-600 mx-auto max-w-[35rem] text-center text-base font-medium">
            EVIL3VIE is designed to be solved alone—or together. Many mysteries are personal. But others are collective.
          </div>
          <div className="flex items-center justify-center gap-6">
            {socials.map((item, index) => (
              <Tooltip key={index} title={item.href ? undefined : "Coming Soon"} placement="top">
                <ExternalLink href={item.href ? item.href : undefined}>
                  <img src={item.img} alt="" className="aspect-square w-[6.25rem] max-lg:w-20" />
                </ExternalLink>
              </Tooltip>
            ))}
          </div>
          <div className="text-secondary-600 pt-6 text-center text-base font-medium">
            © 2025 EviL3viE. All rights reserved
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Section5

export const socials = [
  {
    img: "/images/ic-tele.png",
    href: "https://t.me/evil3vie_game",
  },
  {
    img: "/images/ic-x.png",
    href: "https://x.com/evil3vie_game",
  },
  // {
  //   img: "/images/ic-discord.png",
  //   href: "",
  // },
]
