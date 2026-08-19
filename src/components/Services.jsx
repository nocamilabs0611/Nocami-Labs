import { motion } from 'framer-motion'
import { Code2, Server, Palette } from 'lucide-react'

const services = [
  {
    title: "Full-Stack Web Development",
    description: "End-to-end web solutions built with modern technologies ensuring scalability and performance.",
    icon: Code2,
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderGlow: "group-hover:border-blue-500/50"
  },
  {
    title: "Custom React/Node.js Solutions",
    description: "Tailored applications utilizing the power of React for the frontend and Node.js for robust backends.",
    icon: Server,
    gradient: "from-purple-500/20 to-pink-500/20",
    borderGlow: "group-hover:border-purple-500/50"
  },
  {
    title: "Modern UI/UX Design",
    description: "Cinematic, dark-themed designs with fluid animations that captivate users and provide premium experiences.",
    icon: Palette,
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderGlow: "group-hover:border-emerald-500/50"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export default function Services() {
  return (
    <section className="py-24 relative z-10 bg-dark-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Our Expertise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Delivering cutting-edge solutions across the entire software stack.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`group relative p-8 rounded-2xl bg-dark-800/50 border border-gray-800 backdrop-blur-sm overflow-hidden transition-all duration-300 ${service.borderGlow}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-dark-900 border border-gray-700 flex items-center justify-center mb-6 text-gray-300 group-hover:text-white transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
