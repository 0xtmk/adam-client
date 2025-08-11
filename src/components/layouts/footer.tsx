import { ExternalLink } from "@/libs/ui/external-link"
import { socials } from "@/views/section5"
import { Tooltip } from "antd"
import { FC } from "react"
import { Container } from "./container"

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  return (
    <footer className="relative ">
      <Container className="flex !max-w-[111rem] items-center justify-between py-4">
        <p className="text-secondary-600 flex-col text-base font-medium max-lg:flex max-lg:text-sm">
          <span>© 2025 EviL3viE.</span> <span>All rights reserved</span>
        </p>
        <div className="flex items-center justify-center gap-6 max-lg:gap-2">
          {socials.map((item, index) => (
            <Tooltip key={index} title={item.href ? undefined : "Coming Soon"} placement="top">
              <ExternalLink href={item.href ? item.href : undefined}>
                <img src={item.img} alt="" className="aspect-square w-[6.25rem] max-lg:w-14" />
              </ExternalLink>
            </Tooltip>
          ))}
        </div>
      </Container>
    </footer>
  )
}
