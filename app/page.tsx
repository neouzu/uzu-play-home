"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function UZUplayLanding() {
  const [showBuffSystem, setShowBuffSystem] = useState(false)
  const [cards, setCards] = useState<any[]>([])
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  const buffDefinitions = [
    {
      id: "focus",
      name: "초집중 포션",
      rarity: "EPIC",
      type: "CONSUMABLE",
      stat: "+100% FOCUS",
      description: "시간 왜곡 활성화. 1시간이 10분처럼 느껴지는 몰입 상태에 돌입합니다.",
      flavor: "순수한 집중의 정수.",
      color: "#2E5CFF",
      icon: "🧪",
    },
    {
      id: "shield",
      name: "강철의 의지",
      rarity: "LEGENDARY",
      type: "ARMOR",
      stat: "+50 DEFENSE",
      description: "모든 잡념과 유혹을 99% 확률로 방어합니다.",
      flavor: "규율의 불꽃으로 단련된 방패.",
      color: "#FF9F1C",
      icon: "🛡️",
    },
    {
      id: "sword",
      name: "실행의 검",
      rarity: "RARE",
      type: "WEAPON",
      stat: "+80 ATTACK",
      description: "미루는 습관을 단 한 번의 움직임으로 베어버립니다.",
      flavor: "나쁜 습관을 자를 만큼 날카롭다.",
      color: "#D946EF",
      icon: "⚔️",
    },
  ]

  const handleStartGame = () => {
    // Shuffle and pick 3 cards (for this demo, we just use the 3 we have, shuffled)
    const shuffled = [...buffDefinitions].sort(() => 0.5 - Math.random())
    setCards(shuffled)
    setShowBuffSystem(true)
    setSelectedCardId(null)
    setIsRevealed(false)
  }

  const handleCardClick = (cardId: string, color: string) => {
    if (isRevealed) return // Prevent multiple selections

    setSelectedCardId(cardId)
    setIsRevealed(true)

    // Fire Confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.7 },
      colors: [color, '#ffffff'],
      disableForReducedMotion: true
    });
  }

  const closeBuffSystem = () => {
    setShowBuffSystem(false)
    const problemSection = document.getElementById('problem-section')
    if (problemSection) {
      problemSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F11] text-[#F5F5F7] overflow-x-hidden relative">
      <Header />
      <HeroSection onStart={handleStartGame} />

      <AnimatePresence>
        {showBuffSystem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-black text-white mb-12 tracking-tight"
            >
              {isRevealed ? "아이템 장착 완료!" : "아이템 보상을 선택하세요"}
            </motion.h2>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center perspective-[1000px]">
              {cards.map((card, index) => {
                const isSelected = selectedCardId === card.id
                const isNotSelected = isRevealed && !isSelected

                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 50, rotateX: 30, rotateY: 0 }}
                    animate={{
                      opacity: isNotSelected ? 0.3 : 1,
                      y: 0,
                      rotateX: 0,
                      rotateY: isSelected ? 180 : 0,
                      scale: isSelected ? 1.1 : 1,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1
                    }}
                    className={`relative w-64 h-96 cursor-pointer touch-none hover:scale-105 active:scale-95 transition-transform duration-300`}
                    onClick={() => handleCardClick(card.id, card.color)}
                    style={{
                      transformStyle: 'preserve-3d',
                      pointerEvents: isRevealed ? 'none' : 'auto'
                    }}
                  >
                    {/* FRONT (Card Back Design) */}
                    <div className="absolute inset-0 backface-hidden w-full h-full bg-[#1A1A1D] rounded-2xl border-2 border-white/10 overflow-hidden shadow-2xl group hover:border-primary/50 transition-colors">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111),linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111)] bg-[length:20px_20px] opacity-20" />

                      {/* Center Logo */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-screen">
                        <div className="relative w-32 h-32 grayscale contrast-125">
                          <Image
                            src="/logo.png"
                            alt="UZUplay Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="absolute bottom-6 left-0 right-0 text-center font-mono text-xs text-white/30 tracking-[0.2em]">UZUPLAY SYSTEM</div>
                    </div>

                    {/* BACK (Revealed Content) */}
                    <div
                      className="absolute inset-0 backface-hidden w-full h-full bg-[#1A1A1D] rounded-2xl border-2 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] rotate-y-180"
                      style={{ transform: 'rotateY(180deg)', borderColor: card.color }}
                    >
                      <div className="h-2/3 flex items-center justify-center relative bg-[#0F0F11]">
                        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at center, ${card.color}, transparent)` }} />
                        <div className="text-8xl">{card.icon}</div>
                      </div>
                      <div className="h-1/3 p-4 bg-[#151518] border-t border-white/10 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-lg leading-none mb-1" style={{ color: card.color }}>{card.name}</h3>
                          <p className="text-[10px] text-white/50">{card.rarity} {card.type}</p>
                        </div>
                        <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">"{card.description}"</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12"
              >
                <Button
                  size="lg"
                  onClick={closeBuffSystem}
                  className="bg-white text-black hover:bg-white/90 px-12 py-6 text-xl rounded-full font-bold shadow-xl"
                >
                  모험 계속하기
                </Button>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
      <ProblemSection />
      <MethodologySection />
      <ProjectsSection />
      <ManifestoSection />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0F0F11]/80 border-b border-white/5">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
        <div className="flex items-center">
          <div className="relative w-32 h-8">
            <Image
              src="/logo.png"
              alt="UZUplay Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#manifesto" className="text-sm text-[#86868B] hover:text-[#F5F5F7] transition-colors">
            Manifesto
          </a>
          <a href="#projects" className="text-sm text-[#86868B] hover:text-[#F5F5F7] transition-colors">
            Projects
          </a>
          <a href="#team" className="text-sm text-[#86868B] hover:text-[#F5F5F7] transition-colors">
            Team
          </a>
          <Button
            variant="outline"
            className="border-[#2E5CFF] text-[#2E5CFF] hover:bg-[#2E5CFF] hover:text-white transition-all bg-transparent"
          >
            Contact
          </Button>
        </div>
        <button className="md:hidden text-[#86868B]">
          <Menu className="w-6 h-6" />
        </button>
      </nav>
    </header>
  )
}

// Update Hero props
function HeroSection({ onStart }: { onStart?: () => void }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden pt-20">
      {/* Background with Placeholder Pixel Art Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e10] via-[#151520] to-[#1a1a2e]" />

        {/* Placeholder for Pixel Landscape: A grid overlay to simulate retro feel */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(#2E5CFF 1px, transparent 1px), linear-gradient(90deg, #2E5CFF 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
          }}
        />

        {/* Glow effects simulating monitor reflection / campfire */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-warm/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center gap-12">



        {/* Block 2: The Solution (Main Hero) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
            <span className="block text-white mb-2">지루한 반복을</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#4F7AFF] to-warm drop-shadow-[0_0_20px_rgba(46,92,255,0.4)]">
              모험으로 레벨업!
            </span>
          </h1>
        </motion.div>

        {/* Block 3: Description & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="glass-panel p-8 rounded-3xl max-w-2xl text-center border-white/5 backdrop-blur-xl"
        >
          <p className="text-xl md:text-2xl text-[#F5F5F7] mb-8 font-light">
            UZUplay는 당신의 일상을<br /> 재미있는 <b className="font-bold text-primary">게임</b>으로 바꿔드립니다.
          </p>

          <Button
            size="lg"
            onClick={onStart}
            className="bg-primary hover:bg-primary/90 text-white px-12 py-8 text-xl rounded-full shadow-[0_0_30px_rgba(46,92,255,0.3)] hover:shadow-[0_0_50px_rgba(46,92,255,0.5)] transition-all duration-500 hover:scale-105 active:scale-95"
          >
            Start Game
          </Button>
        </motion.div>

      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#86868B]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll to Play</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#86868B]/50 to-transparent" />
      </motion.div>
    </section>
  )
}

function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="problem-section" ref={ref} className="min-h-screen flex items-center px-6 py-20 relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <div className="text-[12rem] md:text-[16rem] font-bold leading-none bg-gradient-to-br from-[#2E5CFF] to-[#86868B] bg-clip-text text-transparent relative z-10">
              92%
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-black text-[20rem] -z-10 select-none">
              FAIL
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 glass-panel p-10 rounded-3xl"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                92%의 새해 목표가 실패하는 이유는<br />
                의지가 약해서가 아닙니다.
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full" />
            </div>
            <p className="text-2xl text-[#F5F5F7] leading-relaxed font-semibold">
              우리의 뇌는 원래 <span className="text-primary">'재미없는 것'</span>을 싫어합니다.<br />
              고장난 것은 당신이 아니라, <span className="text-warm underline decoration-wavy underline-offset-4">보상 시스템</span>입니다.
            </p>
            <p className="text-lg text-[#86868B]">
              인내심만 강요하는 공부는 이제 그만하세요.<br />
              도파민이 나오는 공부를 시작해야 합니다.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MethodologySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      number: "01",
      title: "아주 작은 시작",
      engTitle: "Baby Steps",
      description: "게임 튜토리얼처럼, 실패할 수 없을 만큼 쉽고 가볍게 시작합니다.",
      icon: "🌱",
    },
    {
      number: "02",
      title: "즉각적인 피드백",
      engTitle: "Instant Feedback",
      description: "몬스터를 잡으면 바로 경험치가 오르듯, 내 행동에 확실한 보상을 줍니다.",
      icon: "⚡",
    },
    {
      number: "03",
      title: "몰입의 즐거움",
      engTitle: "Flow State",
      description: "내 실력에 딱 맞는 난이도로 시간 가는 줄 모르는 몰입감을 선사합니다.",
      icon: "🔥",
    },
  ]

  return (
    <section ref={ref} className="min-h-screen flex items-center px-6 py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="text-sm font-mono text-primary mb-4 tracking-widest uppercase">The Science of Fun</p>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">심리학이 증명한<br /> <span className="text-warm">성장의 지름길</span></h2>
          <p className="text-xl text-[#86868B] max-w-2xl mx-auto">
            자기결정성 이론(Self-Determination Theory)을 바탕으로,<br />
            내가 스스로 선택하고 즐기는 환경을 설계합니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="glass-panel group relative p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 border border-white/5 hover:border-primary/50"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="text-6xl">{step.icon}</div>
                <div className="text-sm font-mono text-white/30 px-3 py-1 rounded-full border border-white/10">{step.number}</div>
              </div>

              <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-primary mb-4 font-mono">{step.engTitle}</p>
              <p className="text-[#86868B] leading-relaxed group-hover:text-[#F5F5F7] transition-colors">{step.description}</p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      name: "Project O",
      tagline: "Productivity RPG",
      status: "Prototyping",
      description: "오늘의 할 일, 지루한 숙제가 아니라 **멋진 모험**이 됩니다. 완료할 때마다 성장하는 나의 캐릭터.",
      color: "#2E5CFF",
    },
    {
      name: "Project X",
      tagline: "Social Habit",
      status: "Alpha Test",
      description: "혼자 하면 외롭지만, **팀**을 맺으면 모험이 됩니다. 친구와 함께해서 그만두지 않게.",
      color: "#FF9F1C",
    },
  ]

  return (
    <section id="projects" ref={ref} className="min-h-screen flex items-center px-6 py-20 relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Our Projects</h2>
          <p className="text-xl text-[#86868B]">지루한 일상을 모험으로 바꾸는 도구들.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative bg-[#1A1A1D] border-4 border-[#2A2A2E] rounded-[2rem] p-8 shadow-2xl overflow-hidden hover:border-primary/50 transition-colors duration-500"
            >
              {/* Console Body Effect */}
              <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-red-500/50 animate-pulse" />
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="w-8 h-2 bg-gray-700 rounded-full" />
                <div className="w-8 h-2 bg-gray-700 rounded-full" />
              </div>

              {/* Screen Area */}
              <div className="bg-[#0F0F11] border-[12px] border-[#252529] rounded-xl p-8 mb-8 relative overflow-hidden h-[300px] flex flex-col justify-center items-center shadow-inner group-hover:shadow-[inset_0_0_50px_rgba(46,92,255,0.1)] transition-shadow">
                {/* Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none" />

                <span className="text-xs font-mono text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mb-4 z-20">
                  {project.status}
                </span>
                <h3 className="text-4xl font-bold mb-2 text-white z-20">{project.name}</h3>
                <p className="text-lg text-[#86868B] mb-2 z-20">{project.tagline}</p>

                {/* Animated Background in Screen */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                  style={{ backgroundColor: project.color, backgroundImage: 'radial-gradient(circle at center, transparent 0%, black 100%)' }} />
              </div>

              {/* Controls Area */}
              <div className="flex justify-between items-end px-4">
                <div className="flex flex-col gap-2">
                  <p className="text-[#F5F5F7] text-lg font-bold leading-relaxed max-w-sm">{project.description}</p>
                </div>

                {/* D-Pad Decoration */}
                <div className="hidden md:grid grid-cols-3 gap-1 opacity-20 transform rotate-12">
                  <div /> <div className="w-8 h-8 bg-white/20 rounded-md" /> <div />
                  <div className="w-8 h-8 bg-white/20 rounded-md" /> <div className="w-8 h-8 bg-white/20 rounded-md" /> <div className="w-8 h-8 bg-white/20 rounded-md" />
                  <div /> <div className="w-8 h-8 bg-white/20 rounded-md" /> <div />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ManifestoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const principles = [
    {
      title: "No Dark Patterns",
      description: "당신을 속이는 디자인은 없습니다. 우리는 당신의 주의력을 훔치지 않습니다.",
    },
    {
      title: "Privacy First",
      description: "당신의 데이터는 온전히 당신의 것입니다. 내가 나의 성장을 소유합니다.",
    },
    {
      title: "Science, not Magic",
      description: "막연한 동기부여가 아닌, 검증된 심리학 이론으로 성장을 설계합니다.",
    },
  ]

  return (
    <section id="manifesto" ref={ref} className="min-h-screen flex items-center px-6 py-20 bg-gradient-to-t from-[#0F0F11] to-[#1a1a2e]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Manifesto</h2>
          <p className="text-xl text-[#86868B] leading-relaxed">
            우리는 당신을 중독시키지 않습니다.<br />
            당신을 <span className="text-white font-bold">성장</span>시킵니다.
          </p>
        </motion.div>

        <div className="space-y-12">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border-l-4 border-primary/30 pl-8 py-4 hover:border-primary transition-colors"
            >
              <h3 className="text-3xl font-bold mb-3">{principle.title}</h3>
              <p className="text-lg text-[#86868B] leading-relaxed">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-16 bg-[#0F0F11] relative overflow-hidden">
      {/* Pixel Footer Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary blur-sm" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">당신의 인생이라는 게임, <br /> 이제 <span className="text-primary">플레이어</span>가 되어보세요.</h2>
          <p className="text-[#86868B] mb-8 text-lg">가장 즐거운 몰입이 당신을 기다립니다.</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full">
            베타 테스터 신청하기
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="relative w-40 h-10">
              <Image
                src="/logo.png"
                alt="UZUplay Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
          <div className="flex gap-8 text-sm text-[#86868B] font-mono">
            <a href="#" className="hover:text-primary transition-colors">
              [ Twitter ]
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              [ LinkedIn ]
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              [ GitHub ]
            </a>
          </div>
        </div>

        <div className="text-center text-sm text-[#86868B]/50 mt-12 font-mono">
          PRESS START TO CONTINUE © 2025 UZUplay.
        </div>
      </div>
    </footer>
  )
}
