import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-cinematic opacity-50 mix-blend-multiply"></div>
      
      {/* Glowing accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan">Nocami Labs</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="mt-4 text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
            Building high-performance, visually stunning web applications that elevate your brand and engage your users.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-dark-800 border border-gray-700 rounded-full overflow-hidden transition-all hover:border-accent-blue hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:scale-105">
            <span className="relative z-10 flex items-center gap-2">
              Start a Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
