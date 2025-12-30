"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Shield, Lock, FlaskConical, Menu } from "lucide-react"

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
      {/* Dynamic Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, x: 0, y: 0 }}
          animate={{
            scale: [1.1, 1.25, 1.1], // Increased zoom range
            x: [0, -60, 0],          // Increased pan distance
            y: [0, -30, 0]
          }}
          transition={{
            duration: 18,            // Faster duration (was 30)
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/hero_pixel_street.png"
            alt="Hero Background"
            fill
            className="object-cover opacity-60" // Removed blur, increased opacity slightly for clarity
            priority
          />
        </motion.div>

        {/* --- PREMIUM VISUAL EFFECTS LAYER --- */}

        {/* 1. CRT Scanlines Texture */}
        <div className="absolute inset-0 bg-scanlines opacity-30 z-10 pointer-events-none mix-blend-overlay" />

        {/* 2. Vignette (Focus Attention) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F0F11_90%)] z-10 pointer-events-none" />

        {/* 3. Ambient Lighting (Cinematic Glows) */}
        {/* Cool Blue (Moonlight/Neon) - Top Left */}
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] mix-blend-screen animate-pulse z-20 pointer-events-none" />
        {/* Warm Orange (Streetlight) - Bottom Right */}
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] mix-blend-screen z-20 pointer-events-none" />

        {/* 4. Color Grading (Unify Theme) */}
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-color z-20 pointer-events-none" />

        {/* 5. Floating Particles (Atmosphere) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          {[...Array(8)].map((_, i) => ( // Increased particle count to 8
            <motion.div
              key={i}
              className="absolute bg-white/30 rounded-full"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -150], // Moves further up
                opacity: [0, 1, 0], // More visible
              }}
              transition={{
                duration: Math.random() * 3 + 3, // Faster (3-6s)
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>

        {/* Base Gradient Fade (Bottom Alignment) */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0F0F11] to-transparent z-20" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-30 flex flex-col items-center gap-12">

        {/* Main Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6 drop-shadow-2xl">
            <span className="block text-white mb-2 text-shadow-lg">지루한 일상의 반복을</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 drop-shadow-[0_0_30px_rgba(139,92,246,0.6)]">
              모험으로 레벨업!
            </span>
          </h1>
        </motion.div>

        {/* Description & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="glass-panel p-8 rounded-3xl max-w-2xl text-center border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Shimmer Effect on Box */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

          <p className="text-xl md:text-2xl text-[#F5F5F7] mb-8 font-light relative z-10">
            UZUplay는 당신의 일상을<br /> 재미있는 <b className="font-bold text-violet-400">게임</b>으로 바꿔드립니다.
          </p>

          <Button
            size="lg"
            onClick={onStart}
            className="bg-violet-600 hover:bg-violet-500 text-white px-12 py-8 text-xl rounded-full shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 relative z-10"
          >
            Start Game
          </Button>
        </motion.div>

      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs uppercase tracking-widest drop-shadow-md">Scroll to Play</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
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
              우리의 뇌는 원래 <span className="text-purple-400">'재미없는 것'</span>을 싫어합니다.<br />
              고장난 것은 <span className="text-white">우리가</span> 아니라, <span className="text-pink-400 underline decoration-wavy underline-offset-4">보상 시스템</span>입니다.
            </p>
            {/* Deleted paragraph as requested */}
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
          {steps.map((step, index) => {
            const imageSrc = index === 0 ? "/images/methodology_dot_tutorial.jpg" :
              index === 1 ? "/images/methodology_dot_exp.png" :
                "/images/methodology_dot_ultimate.jpg";
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="glass-panel group relative p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 border border-white/5 hover:border-violet-500/50 overflow-hidden"
              >
                {/* Retro Monitor Image Container */}
                <div className="relative w-full h-48 mb-8 rounded-xl overflow-hidden border border-white/10 shadow-inner group-hover:border-violet-500/30 transition-colors">
                  {/* Scanlines Overlay */}
                  <div className="absolute inset-0 bg-scanlines opacity-20 z-20 pointer-events-none group-hover:opacity-40 transition-opacity" />

                  {/* Vignette & Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(15,15,17,0.8)_100%)] z-10" />

                  <Image
                    src={imageSrc}
                    alt={step.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[0.2] group-hover:grayscale-0"
                  />

                  {/* CRT Flickering Light Effect */}
                  <div className="absolute inset-0 bg-violet-500/5 group-hover:animate-pulse z-10 pointer-events-none" />
                </div>

                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <div className="text-sm font-mono text-white/30 px-3 py-1 rounded-full border border-white/10">{step.number}</div>
                </div>

                <p className="text-sm text-violet-400 mb-4 font-mono uppercase tracking-wider">{step.engTitle}</p>
                <p className="text-[#86868B] leading-relaxed group-hover:text-[#F5F5F7] transition-colors">{step.description}</p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10" />
              </motion.div>
            );
          })}
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

  return (
    <section id="manifesto" ref={ref} className="min-h-screen flex flex-col items-center justify-center relative py-32 bg-gradient-to-t from-[#0F0F11] to-[#1a1a2e]">
      <div className="container mx-auto max-w-6xl relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white drop-shadow-2xl">
            Manifesto
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed">
            우리는 당신을 중독시키지 않습니다.<br />
            당신을 <span className="font-bold text-violet-400">성장</span>시킵니다.
          </p>
        </motion.div>

        {/* Gamified Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Shield */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, borderColor: "rgba(139,92,246,0.5)" }}
            className="group relative p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-violet-500/5 group-hover:bg-violet-500/10 transition-colors duration-300" />

            {/* Icon Container */}
            <div className="relative w-32 h-32 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 group-hover:shadow-[0_0_40px_rgba(124,58,237,0.2)] transition-all duration-300 overflow-hidden">
              <div className="relative w-24 h-24 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <Image
                  src="/images/manifesto_shield.png"
                  alt="No Dark Patterns Shield"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-300 transition-colors">No Dark Patterns</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              당신을 속이는 디자인은 없습니다.<br />우리는 당신의 주의력을 훔치지 않습니다.
            </p>
          </motion.div>

          {/* Card 2: Lock (Privacy) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05, borderColor: "rgba(139,92,246,0.5)" }}
            className="group relative p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-violet-500/5 group-hover:bg-violet-500/10 transition-colors duration-300" />

            <div className="relative w-32 h-32 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 group-hover:shadow-[0_0_40px_rgba(124,58,237,0.2)] transition-all duration-300 overflow-hidden">
              <div className="relative w-24 h-24 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <Image
                  src="/images/manifesto_chest.png"
                  alt="Privacy First Chest"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-300 transition-colors">Privacy First</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              당신의 데이터는 온전히 당신의 것입니다.<br />내가 나의 성장을 소유합니다.
            </p>
          </motion.div>

          {/* Card 3: Potion/Flask (Science) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05, borderColor: "rgba(139,92,246,0.5)" }}
            className="group relative p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-violet-500/5 group-hover:bg-violet-500/10 transition-colors duration-300" />

            <div className="relative w-32 h-32 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 group-hover:shadow-[0_0_40px_rgba(124,58,237,0.2)] transition-all duration-300 overflow-hidden">
              <div className="relative w-24 h-24 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                <Image
                  src="/images/manifesto_potion.png"
                  alt="Science First Potion"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-300 transition-colors">Science, not Magic</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              막연한 동기부여가 아닌,<br />검증된 심리학 이론으로 성장을 설계합니다.
            </p>
          </motion.div>
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
