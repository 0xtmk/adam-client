import { useCallback } from "react"
import { confetti } from "tsparticles-confetti"
const TestPage = () => {
  const count = 200
  const defaults = {
    origin: { y: 0.7 },
  }

  const fire = useCallback((particleRatio: any, opts: any) => {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      }),
    )
  }, [])

  const run = useCallback(() => {
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    fire(0.2, {
      spread: 60,
    })

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }, [fire])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <button onClick={run} className="rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600">
        🎉 Run Confetti
      </button>
    </div>
  )
}

export default TestPage
