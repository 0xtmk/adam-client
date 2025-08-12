import { FC, SVGProps } from "react"

interface CardLeaderboardProps extends SVGProps<SVGSVGElement> {}

export const CardLeaderboard: FC<CardLeaderboardProps> = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1441" height="1514" fill="none" viewBox="0 0 1441 1514" {...props}>
      <foreignObject width="1459.75" height="1561.69" x="-7.317" y="-6.569">
        <div
        //   xmlns="http://www.w3.org/1999/xhtml"
        //   clipPath="url(#bgblur_0_7440_1603_clip_path)"
          style={{ backdropFilter: "blur(5px)", height: "100%", width: "100%" }}
        ></div>
      </foreignObject>
      <g data-figma-bg-blur-radius="10" filter="url(#filter0_di_7440_1603)">
        <path
          fill="#15519E"
          fillOpacity="0.2"
          d="M2.682 46.136C2.626 25.15 19.594 8.08 40.581 8.008L1400.44 3.431c20.99-.07 38.05 16.885 38.1 37.872l3.9 1460.607c.05 20.99-16.91 38.06-37.9 38.13l-1359.862 4.58c-20.986.07-38.045-16.89-38.1-37.87z"
        ></path>
      </g>
      <defs>
        <clipPath id="bgblur_0_7440_1603_clip_path" transform="translate(7.317 6.57)">
          <path d="M2.682 46.136C2.626 25.15 19.594 8.08 40.581 8.008L1400.44 3.431c20.99-.07 38.05 16.885 38.1 37.872l3.9 1460.607c.05 20.99-16.91 38.06-37.9 38.13l-1359.862 4.58c-20.986.07-38.045-16.89-38.1-37.87z"></path>
        </clipPath>
        <filter
          id="filter0_di_7440_1603"
          width="1459.75"
          height="1561.69"
          x="-7.317"
          y="-6.569"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="3.25"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_7440_1603"></feBlend>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_7440_1603" result="shape"></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite>
          <feColorMatrix values="0 0 0 0 0.640385 0 0 0 0 0.640385 0 0 0 0 0.640385 0 0 0 0.25 0"></feColorMatrix>
          <feBlend in2="shape" result="effect2_innerShadow_7440_1603"></feBlend>
        </filter>
      </defs>
    </svg>
  )
}
