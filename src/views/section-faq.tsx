import { Container } from "@/components/layouts/container"
import { cn } from "@/utils/classnames"
import { Collapse } from "antd"
import { FC, useMemo, useState } from "react"

interface SectionFAQProps {}

export const SectionFAQ: FC<SectionFAQProps> = () => {
  const [activeFaq, setActiveFaq] = useState<number>(0)
  const [questionActive, setQuestionActive] = useState<string>()

  const colapseItems = useMemo(() => {
    return faqs[activeFaq].content?.map((it) => {
      return {
        key: it.question,
        label: it.question,
        children: it.answer,
      }
    })
  }, [activeFaq])

  return (
    <div>
      <Container size={"main"} className="flex items-center py-6 max-lg:py-24 lg:min-h-screen">
        <div className="grid w-full grid-cols-[minmax(0,392fr)_minmax(0,808fr)] gap-6 bg-[length:100%_100%] bg-center max-lg:grid-cols-1 max-lg:bg-[url(/images/bg-faq.png)]">
          <div className="bg-[length:100%_100%] bg-center p-10 max-lg:px-7 lg:bg-[url(/images/bg-faq-title.png)]">
            <h1 className="font-UScream text-[5.5rem] leading-none text-stone-950 max-lg:text-[3.5rem]">FAQ</h1>

            <div className="mt-8 space-y-6 max-lg:mt-6">
              {faqs.map((it, idx) => {
                return (
                  <div key={it.title}>
                    <button
                      onClick={() => setActiveFaq(idx)}
                      className={cn(
                        "block cursor-pointer text-left text-2xl font-medium",
                        activeFaq == idx ? "text-stone-950" : "text-stone-500",
                      )}
                    >
                      {it.title}
                    </button>

                    {idx == activeFaq && (
                      <Collapse
                        accordion
                        items={colapseItems}
                        rootClassName="custom-collapse lg:hidden"
                        bordered={false}
                        expandIconPosition="right"
                        expandIcon={({ isActive }) => (
                          <img
                            src="/images/ic-collapse-down.png"
                            className={cn("h-6 w-6", isActive && "rotate-180")}
                            alt=""
                          />
                        )}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="h-[65vh] min-h-[637px] overflow-auto bg-[length:100%_100%] bg-center p-10 max-lg:hidden lg:bg-[url(/images/bg-faq-content.png)]">
            <Collapse
              accordion
              items={colapseItems}
              rootClassName="custom-collapse"
              bordered={false}
              expandIconPosition="right"
              expandIcon={({ isActive }) => (
                <img src="/images/ic-collapse-down.png" className={cn("h-8 w-8", isActive && "rotate-180")} alt="" />
              )}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

const faqs = [
  {
    title: "GAMEPLAY",
    content: [
      {
        question: "What is EviL3viE?",
        answer:
          "EviL3viE is a Web3 horror puzzle game on Solana that blends psychological storytelling with play-to-earn mechanics. Players must escape a cursed school by solving puzzles, avoiding spirits, and uncovering lost memories.",
      },
      {
        question: "How do I play the game?",
        answer:
          "At the start of each level, you’ll be given a mission displayed on screen. To complete it, explore hallways and classrooms to find hidden objects, solve puzzles, and retrieve the key item. You have 120 seconds to complete each level.",
      },
      {
        question: "What happens if I run out of time?",
        answer:
          "If you don’t complete a level within the time limit, you’ll lose and must replay the level from the beginning.",
      },
      {
        question: "Are there enemies or threats?",
        answer:
          "Yes. On some levels, the haunted lecturer will chase you. You'll need to hide in classrooms or marked safe zones to survive, or you’ll lose and restart.",
      },
    ],
  },

  {
    title: "AI ASSISTANCE – Dr. Rho",
    content: [
      {
        question: "Who is Dr. Rho?",
        answer: `Dr. Rho is your AI assistant—your only "trusted" guide in the game. He helps interpret your objectives, gives hints for puzzles, and may even hold secrets about the school’s dark history.`,
      },
      {
        question: "How do I contact Dr. Rho?",
        answer:
          "Simply interact with the AI chat interface in-game. You can ask about objectives, puzzles, and survival tips.",
      },
      {
        question: "Can I always trust Dr. Rho?",
        answer: "That… depends. He knows more than he says, and some truths are better left buried.",
      },
    ],
  },

  {
    title: "LEVELS & PUZZLES",
    content: [
      {
        question: "How many levels are there in EviL3viE?",
        answer: (
          <div>
            There are <strong>50 levels</strong> in total. Each level presents a unique puzzle and new challenges, as
            you descend deeper into the cursed school.
          </div>
        ),
      },
      {
        question: "How is the gameplay structured across these levels?",
        answer: (
          <div>
            <p>The game is divided into three main sections:</p>
            <ul className="pl-4">
              <li>
                <strong>Levels 1-10:</strong> These are <strong>free-to-play</strong>,{" "}
                {`allowing everyone to experience the game’s core mechanics and start
                unraveling the mystery of the school.`}
              </li>
              <li>
                <strong>Levels 11-17:</strong> To access these levels, you will need to{" "}
                <strong>hold at least 1,000 Tokens</strong> (available after the token listing). These levels offer more
                difficult puzzles and greater rewards.
              </li>
              <li>
                <strong>Levels 18-50:</strong> These levels require you to <strong>pay tokens</strong> to play. The
                puzzles here are even more complex, and the rewards become much larger as you progress further into the
                game.
              </li>
            </ul>
          </div>
        ),
      },
      {
        question: "What kind of rewards can I expect from higher levels?",
        answer: (
          <div>
            {`The further you go, the greater the rewards. In the later levels, you’ll unlock`}{" "}
            <strong>exclusive NFTs, higher token payouts</strong>, and access to hidden content, including rare
            artifacts and secret paths.
          </div>
        ),
      },
      {
        question: "Do the puzzles get harder as I progress?",
        answer: (
          <div>
            Yes, the puzzles get increasingly challenging, especially from <strong>level 11 onward</strong>, with more
            intricate clues, time constraints, and dangerous encounters. Only the most skilled players will survive the
            deeper levels.
          </div>
        ),
      },
      {
        question: "Do I receive rewards for completing specific levels?",
        answer: (
          <div>
            <p>
              Yes! For every <strong>10th level milestone</strong> {`you complete, you’ll receive a`}{" "}
              <strong>special NFT</strong> as a reward. These NFTs are unique and can be collected as part of your
              progress or may offer in-game bonuses.
            </p>
            <ul className="pl-4">
              <li>
                <strong>Level 20:</strong> First NFT reward
              </li>
              <li>
                <strong>Level 30:</strong> Second NFT reward
              </li>
              <li>
                <strong>Level 40:</strong> Third NFT reward
              </li>
              <li>
                <strong>Level 50:</strong> Final NFT reward
              </li>
            </ul>

            <p>
              Additionally, by unlocking levels and progressing through the game, you will receive{" "}
              <strong>monthly revenue tokens</strong> based on the number of your NFTs prized. This provides a passive
              income as you continue to play and complete challenges. These tokens can be used for further in-game
              purchases or exchanged for other benefits.
            </p>
            <p>
              NFT rewards might be the special items collected, and will be tradable on NFT marketplaces (coming soon).
            </p>
          </div>
        ),
      },
    ],
  },
  {
    title: "NFTS & ON-CHAIN MEMORY",
    content: [
      {
        question: " What are the NFT-based items in the game?",
        answer: `Players can collect rare artifacts and “soulbound memories.” These NFTs may unlock special content, access hidden floors, or enhance your experience.`,
      },
      {
        question: "What does Play-to-Own mean?",
        answer:
          "Every puzzle you solve, every memory you collect, and every decision you make is stored on-chain. You own what you uncover—and some items may hold long-term value in the ecosystem.",
      },
    ],
  },
  {
    title: "P2E & LEADERBOARD MECHANICS",
    content: [
      {
        question: "How do I earn from playing EviL3viE?",
        answer:
          "By completing levels and missions, players earn tokens. These tokens can be used to unlock sealed doors, recover memories, or gain access to premium content (coming soon).",
      },
      {
        question: "What can I use the token for?",
        answer:
          "Tokens are used for gameplay boosts: unlocking hidden levels, reviving from failure, or unlocking parts of the lore you missed (coming soon).",
      },
      {
        question: "Is there a leaderboard with rewards?",
        answer:
          "Yes. Your level progress and total time are recorded on a public leaderboard. Top players receive token rewards, rare NFTs, and priority for upcoming game expansions.",
      },
    ],
  },

  {
    title: "TECH & ACCESS",
    content: [
      {
        question: "What platform is EviL3viE built on?",
        answer: (
          <div>
            {` It’s built on`} <strong>Solana blockchain</strong>, leveraging fast, low-cost transactions for seamless
            Web3 gameplay.
          </div>
        ),
      },
      {
        question: "Do I need a wallet to play?",
        answer: "Yes. You’ll connect your Phantom wallet to start playing, and track your on-chain progress.",
      },
      {
        question: "Is there a free trial or demo mode?",
        answer:
          "Yes, early players can access the game with limited missions (10 first levels) and basic features before unlocking full P2E access (the rest).",
      },
    ],
  },
]
