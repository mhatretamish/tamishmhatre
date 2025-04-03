"use client"

import { useState, useEffect } from "react"
import { Music, ShoppingBag, GraduationCap, Briefcase, SnailIcon as Sneaker, Mail, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import TerminalHacker from "@/components/terminal-hacker"

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [deadlineCount, setDeadlineCount] = useState(7)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 99) {
          clearInterval(interval)
          setTimeout(() => setIsLoaded(true), 1000)
          return 99
        }
        return prev + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  const handleDeadlineClick = () => {
    setDeadlineCount((prev) => prev + 1)
    toast({
      title: "Another deadline ignored",
      description: "You're getting really good at this.",
    })
  }

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null)
    } else {
      setActiveSection(section)
    }
  }

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-black p-4">
        <div className="glitch-wrapper">
          <h1 className="text-4xl font-bold mb-8 text-white glitch-text" data-text="LOADING EXCUSES...">
            LOADING EXCUSES...
          </h1>
        </div>
        <Progress value={loadingProgress} className="w-80 h-1 bg-gray-800" />
        <p className="mt-4 text-gray-500 font-mono text-sm">
          {loadingProgress}% - This will never reach 100% (just like my projects)
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Terminal Hacker Component */}
      <TerminalHacker />

      {/* Header section */}
      <header className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <motion.div
          className="z-10 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="glitch-wrapper mb-4">
            <h1 className="text-6xl md:text-8xl font-bold glitch-text" data-text="TAMISH MHATRE">
              TAMISH MHATRE
            </h1>
          </div>
          <h2 className="text-xl md:text-2xl text-gray-400 font-light tracking-wider mb-8">
            PROFESSIONAL EXCUSE-MAKER WITH A WIFI CONNECTION
          </h2>

          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-400 hover:text-white hover:border-white"
              onClick={handleDeadlineClick}
            >
              DEADLINES IGNORED: {deadlineCount}
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <ChevronDown className="w-8 h-8 text-gray-500 animate-bounce" />
        </motion.div>

        {/* Glitch effect elements */}
        <div className="glitch-horizontal"></div>
        <div className="glitch-vertical"></div>
      </header>

      {/* About section */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-12 inline-block relative">
            <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">01.</span>
            WHAT'S THIS GUY'S DEAL ANYWAY?
            <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
          </h2>

          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
            Just another dropout who thinks being unable to finish things is a personality trait. Currently pretending
            that avoiding structured education was actually "having a game plan"
            <span className="text-gray-500 italic"> (narrator: it wasn't)</span>.
          </p>
        </motion.div>
      </section>

      {/* Failure Highlight Reel */}
      <section className="py-24 px-6 md:px-12 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block relative">
              <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">02.</span>
              FAILURE HIGHLIGHT REEL
              <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
            </h2>
          </motion.div>

          {/* Music Career */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="border border-zinc-800 p-6 rounded-sm cursor-pointer hover:border-zinc-700 transition-colors"
              onClick={() => toggleSection("music")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Music className="w-6 h-6 text-gray-500 mr-4" />
                  <h3 className="text-xl font-bold">
                    MUSIC CAREER{" "}
                    <span className="text-sm text-gray-500 font-normal">AKA "MY PARENTS PAID FOR LESSONS"</span>
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${activeSection === "music" ? "rotate-180" : ""}`}
                />
              </div>

              <AnimatePresence>
                {activeSection === "music" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Separator className="my-4 bg-zinc-800" />
                    <ul className="space-y-2 text-gray-400 pl-10">
                      <li>
                        Endured 6 years of Indian classical singing (mostly because couldn't figure out how to quit)
                      </li>
                      <li>Released music that 3M+ people accidentally played while trying to find something better</li>
                      <li>1M+ monthly listeners who probably have "autoplay" turned on and fell asleep</li>
                    </ul>

                    <div className="mt-6 pl-10">
                      <Button
                        variant="outline"
                        className="border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          toast({
                            title: "Music player crashed",
                            description: "Just like my music career",
                          })
                        }}
                      >
                        Play My "Hit" Song
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Business Ventures */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="border border-zinc-800 p-6 rounded-sm cursor-pointer hover:border-zinc-700 transition-colors"
              onClick={() => toggleSection("business")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShoppingBag className="w-6 h-6 text-gray-500 mr-4" />
                  <h3 className="text-xl font-bold">
                    BUSINESS VENTURES{" "}
                    <span className="text-sm text-gray-500 font-normal">AKA "STUFF I STARTED THEN ABANDONED"</span>
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${activeSection === "business" ? "rotate-180" : ""}`}
                />
              </div>

              <AnimatePresence>
                {activeSection === "business" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Separator className="my-4 bg-zinc-800" />
                    <ul className="space-y-2 text-gray-400 pl-10">
                      <li>
                        Created e-commerce store at 16 that sold 26,800+ orders of products nobody actually needed
                      </li>
                      <li>Bragged about order numbers but mysteriously never mentions profit margins</li>
                      <li>
                        Shut it down with the classic excuse of "juggling business and school" (translation: got bored)
                      </li>
                    </ul>

                    <div className="mt-6 pl-10">
                      <p className="text-sm text-gray-500 mb-2">PROFIT MARGIN:</p>
                      <div className="flex items-center gap-4">
                        <Progress value={3} className="h-1 bg-zinc-800 w-64" />
                        <span className="text-gray-400 text-sm">3%</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">(but hey, look at those order numbers!)</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Educational Achievements */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="border border-zinc-800 p-6 rounded-sm cursor-pointer hover:border-zinc-700 transition-colors"
              onClick={() => toggleSection("education")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <GraduationCap className="w-6 h-6 text-gray-500 mr-4" />
                  <h3 className="text-xl font-bold">
                    EDUCATIONAL ACHIEVEMENTS{" "}
                    <span className="text-sm text-gray-500 font-normal">AKA "PLACES I DIDN'T STAY"</span>
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${activeSection === "education" ? "rotate-180" : ""}`}
                />
              </div>

              <AnimatePresence>
                {activeSection === "education" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Separator className="my-4 bg-zinc-800" />
                    <ul className="space-y-2 text-gray-400 pl-10">
                      <li>Engineering school survivor (for approximately 7 minutes)</li>
                      <li>Self-certified PhD in finding YouTube videos more interesting than lectures</li>
                      <li>
                        Made engineering drawing sound like torture when really just couldn't draw a straight line
                      </li>
                      <li>Claims dyslexia only affects him in classrooms (convenient!)</li>
                    </ul>

                    <div className="mt-6 pl-10">
                      <p className="text-sm text-gray-500 mb-2">ATTENDANCE RECORD:</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(30)].map((_, i) => (
                          <div
                            key={`attendance-${i}`}
                            className={`w-2 h-6 ${i < 3 ? "bg-gray-700" : "bg-zinc-900 border border-zinc-800"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Startup Failure */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="border border-zinc-800 p-6 rounded-sm cursor-pointer hover:border-zinc-700 transition-colors"
              onClick={() => toggleSection("startup")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Briefcase className="w-6 h-6 text-gray-500 mr-4" />
                  <h3 className="text-xl font-bold">
                    STARTUP FAILURE <span className="text-sm text-gray-500 font-normal">AKA "MY GAP YEAR"</span>
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${activeSection === "startup" ? "rotate-180" : ""}`}
                />
              </div>

              <AnimatePresence>
                {activeSection === "startup" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Separator className="my-4 bg-zinc-800" />
                    <ul className="space-y-2 text-gray-400 pl-10">
                      <li>Briefly worked at something called "Ghost Pay" which, appropriately, disappeared</li>
                      <li>Main achievement: Using company money to "travel half of India"</li>
                      <li>Calls this experience "valuable" (valuable for the Instagram pics, maybe)</li>
                    </ul>

                    <div className="mt-6 pl-10 grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={`insta-${i}`}
                          className="aspect-square bg-zinc-900 border border-zinc-800 flex items-center justify-center"
                        >
                          <p className="text-xs text-gray-600 p-1 text-center">
                            {
                              [
                                "Beach selfie with company laptop",
                                "Taj Mahal 'business meeting'",
                                "Startup culture = hammock",
                              ][i]
                            }
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Delusion */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900 relative overflow-hidden">
        <div className="glitch-horizontal opacity-20"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block relative">
              <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">03.</span>
              CURRENT DELUSION
              <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center mb-8">
              <Sneaker className="w-8 h-8 text-gray-500 mr-4" />
              <h3 className="text-4xl font-bold tracking-tighter">SNEAKLAB</h3>
            </div>

            <p className="text-xl text-gray-400 italic mb-12">
              Because the world definitely needed another sneaker customization platform
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-zinc-800 p-6 rounded-sm">
                <h4 className="text-lg font-bold mb-4 text-gray-300">OVERAMBITIOUS MOCKUPS</h4>
                <div className="aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <p className="text-sm text-gray-600 p-2 text-center">
                    [Wireframe that will change 47 times before launch]
                  </p>
                </div>
              </div>

              <div className="border border-zinc-800 p-6 rounded-sm">
                <h4 className="text-lg font-bold mb-4 text-gray-300">SNEAKER CUSTOMIZER</h4>
                <div className="aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Button
                    variant="outline"
                    className="border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700"
                    onClick={() => {
                      toast({
                        title: "Customizer crashed at 99%",
                        description: "Just like all my projects",
                      })
                    }}
                  >
                    Try Customizer (Will Crash)
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12 border border-zinc-800 p-6 rounded-sm">
              <h4 className="text-lg font-bold mb-4 text-gray-300">PROJECT TIMELINE:</h4>
              <div className="flex items-center">
                <div className="w-1/4 text-center p-2 border-r border-zinc-800">
                  <p className="text-sm font-bold text-gray-300">Planning</p>
                  <p className="text-xs text-gray-500">✓ Done</p>
                </div>
                <div className="w-1/4 text-center p-2 border-r border-zinc-800">
                  <p className="text-sm font-bold text-gray-300">Design</p>
                  <p className="text-xs text-gray-500">✓ Done</p>
                </div>
                <div className="w-1/4 text-center p-2 border-r border-zinc-800">
                  <p className="text-sm font-bold text-gray-300">Development</p>
                  <p className="text-xs text-gray-500">5% Complete</p>
                </div>
                <div className="w-1/4 text-center p-2">
                  <p className="text-sm font-bold text-gray-300">Launch</p>
                  <p className="text-xs text-gray-500">Never</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dyslexia Corner */}
      <section className="py-24 px-6 md:px-12 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block relative">
              <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">04.</span>
              THE "DYSLEXIA MADE ME DO IT" CORNER
              <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
          >
            <div className="border border-zinc-800 p-6 rounded-sm">
              <p className="text-lg text-gray-400 leading-relaxed">
                Can spell <span className="font-bold text-white">"e-commerce success"</span> but mysteriously can't
                spell <span className="font-bold text-white">"responsibility"</span>
              </p>
            </div>

            <div className="border border-zinc-800 p-6 rounded-sm">
              <p className="text-lg text-gray-400 leading-relaxed">
                Turns out attention span issues aren't actually dyslexia, just regular procrastination
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 border border-zinc-800 p-6 rounded-sm"
          >
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-4 text-gray-300">WORDS I CAN SPELL CORRECTLY:</h4>
              <div className="flex flex-wrap gap-2">
                {["Money", "Success", "Excuse", "Instagram", "Travel", "Procrastinate"].map((word, i) => (
                  <div key={`word-${i}`} className="px-3 py-1 border border-zinc-800 rounded-sm text-sm">
                    {word}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-gray-300">WORDS I "CAN'T" SPELL:</h4>
              <div className="flex flex-wrap gap-2">
                {["Responsibility", "Commitment", "Deadline", "Perseverance", "Discipline"].map((word, i) => (
                  <div
                    key={`word-${i}`}
                    className="px-3 py-1 border border-zinc-700 bg-zinc-900 rounded-sm text-sm text-gray-500"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block relative">
              <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">05.</span>
              DON'T CONTACT ME
              <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <Mail className="w-12 h-12 text-gray-500 mx-auto mb-8" />

            <p className="text-xl text-gray-400 mb-4">If you're lucky enough, I will find you.</p>

            <p className="text-sm text-gray-500 italic mb-12">
              (Translation: I'm terrible at responding to emails anyway)
            </p>

            <Button
              variant="outline"
              className="border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700"
              onClick={() => {
                toast({
                  title: "Email sent to void",
                  description: "I'll get back to you... eventually",
                })
              }}
            >
              Send Email (I Won't Reply)
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-6 md:px-12 bg-black border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Tamish Mhatre. All excuses reserved.
        </div>
      </footer>
    </div>
  )
}

