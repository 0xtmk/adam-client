import { useMemo } from "react";

const SQUARE_COUNT = 200;
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const SquareRain = () => {
  const squares = useMemo(() => {
    return Array.from({ length: SQUARE_COUNT }).map((_, i) => ({
      left: getRandom(0, 100),
      size: getRandom(1, 3),
      duration: getRandom(4.5, 7), 
      delay: getRandom(0, 3),
      opacity: getRandom(0.3, 0.8),
    }))
  }, [])
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-10 h-[160px] w-full overflow-visible">
      {squares.map((sq, i) => (
        <div
          key={i}
          style={{
            left: `${sq.left}%`,
            width: sq.size,
            height: sq.size,
            opacity: sq.opacity,
            animation: `square-fall ${sq.duration}s linear ${sq.delay}s infinite`,
            background: "rgba(255,255,255,0.7)",
            borderRadius: 2,
          }}
          className="absolute"
        />
      ))}
    </div>
  )
}


export default SquareRain