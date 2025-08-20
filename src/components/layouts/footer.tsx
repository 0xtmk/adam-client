import { socials } from "@/constants/app"
import { Text } from "@/libs/ui/text"
import { cn } from "@/utils/classnames"
import { Container } from "./container"

const Footer = () => {
  return (
    <footer className="absolute bottom-0 z-30 flex h-14 max-lg:h-10 w-full items-center bg-[rgba(255,255,255,0.01)] backdrop-blur-[25px]">
      <Container size="header" className="flex items-center justify-between">
        <p className="text-base max-lg:text-xs max-sm:text-[10px]">©2025 Adamgives. All rights reserved.</p>
        <div className="flex items-center gap-5 max-lg:gap-2">
          {socials?.map((social, index) => (
            <a
              className="hover:text-info-500 flex items-center gap-1"
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={social.image} alt="" className="inline-block h-6 w-6 max-sm:h-5 max-sm:w-5" />
              <Text className={cn("text-base", "max-lg:hidden")}>{social.label}</Text>
            </a>
          ))}
        </div>
      </Container>
    </footer>
  )
}
export default Footer
