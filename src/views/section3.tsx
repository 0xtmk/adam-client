import { Container } from "@/components/layouts/container"
import { cn } from "@/utils/classnames"
import { FC, useState } from "react"

import "swiper/css"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"

interface Section3Props {
  currentBook: number
}

const Section3: FC<Section3Props> = ({ currentBook }) => {
  const [currentBookIndex, setCurrentBookIndex] = useState(0)
  return (
    <>
      <Container
        id="section3"
        className="sectionBook w-full px-4 pt-[11.25rem] max-lg:hidden lg:!mx-auto lg:!h-screen lg:!w-screen lg:px-6"
      >
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 max-lg:hidden">
          <img src="/images/bg-book-new.png" alt="" className="h-full w-full max-lg:hidden" />
        </div>

        <div className="absolute left-1/2 top-1/2 grid w-full -translate-x-1/2 -translate-y-1/2 grid-cols-2 items-center justify-center p-20 pl-24 max-lg:hidden">
          <div className="mx-auto flex max-w-[27.5rem] flex-col items-start justify-center gap-10">
            <div className="flex flex-col gap-[22px]">
              <div className="font-UScream text-[5.5rem] leading-[90%] text-stone-950">
                Puzzle by Puzzle, the Story Unfolds
              </div>
              <div className="text-base font-medium text-stone-950">
                Every answer brings you closer to the truth... or something else.
              </div>
            </div>
            <div className="flex w-full flex-col gap-6">
              <div className="h-[1px] w-full bg-stone-950"></div>
              <div className="flex w-full flex-col gap-6">
                {Section3Data.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div
                      className={cn("text-2xl font-medium text-stone-950", currentBook !== index && "text-stone-500")}
                    >
                      {item.title}
                    </div>
                    {currentBook === index && <div className="text-sm font-medium text-stone-950">{item.content}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <img src={Section3Data[currentBook ?? 0].img} alt="" />
            <div className="absolute bottom-10 text-2xl font-medium text-stone-950">
              {Section3Data[currentBook ?? 0].subTitle}
            </div>
          </div>
        </div>
      </Container>

      <Container className="hidden flex-col gap-10 pb-40 pt-[6.25rem] max-lg:flex">
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-5">
            <div className="font-UScream text-primary-500 text-[3.5rem] leading-[90%]">
              Puzzle by Puzzle, the Story Unfolds
            </div>
            <div className="text-secondary-400 text-base font-medium">
              Every answer brings you closer to the truth... or something else.
            </div>
          </div>
          <div className="flex h-[1px] w-full bg-stone-600"></div>
          <div className="flex w-full flex-col gap-6">
            {Section3Data.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div
                  className={cn(
                    "text-secondary-400 text-2xl font-medium",
                    currentBookIndex !== index && "text-stone-500",
                  )}
                >
                  {item.title}
                </div>
                {currentBookIndex === index && (
                  <div className="text-secondary-400 text-sm font-medium">{item.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <Swiper
            spaceBetween={16}
            slidesPerView="auto"
            className="z-50"
            style={{ paddingBottom: "1rem" }}
            touchStartPreventDefault={false}
            touchRatio={1.5}
            autoplay={true}
            onSlideChange={(swiper) => {
              setCurrentBookIndex(swiper.realIndex)
            }}
          >
            {Section3Data.map((item, index) => (
              <SwiperSlide key={index} className="!flex-shrink-0">
                <div className="relative flex items-center justify-center">
                  <img src={item.img} alt="" className="" />
                  <div className="absolute bottom-8 text-base font-medium text-stone-950">{item.subTitle}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </>
  )
}

export default Section3

export const Section3Data = [
  {
    title: "Remember the Clues",
    content:
      "The wrong answer doesn’t just block your path. It resets something. You repeat the cycle. Again. And again.",
    img: "/images/item-book-1.png",
    subTitle: "Remember the Clues",
  },
  {
    title: "The Building Knows You",
    content:
      "It reacts to your fear… your hesitation. Lights flicker differently. Rooms shift. Some doors lock harder the longer you wait.",
    img: "/images/item-book-2.png",
    subTitle: "The Building Knows You",
  },
  {
    title: "You Were Here Before",
    content:
      "That feeling? It’s real. Blood on the wall spells something you’ve almost read before. A whisper in the dark: “You almost remembered this once…”",
    img: "/images/item-book-3.png",
    subTitle: "You Were Here Before",
  },
  {
    title: "Solving Changes You",
    content:
      "Some puzzles leave more than answers. Your reflection changes. New memories surface… and not all of them are yours.",
    img: "/images/item-book-4.png",
    subTitle: "Solving Changes You",
  },
]
