import { motion } from 'framer-motion'

const technologies = [
  { name: "React", color: "hover:text-[#61DAFB] hover:border-[#61DAFB]/50" },
  { name: "JavaScript", color: "hover:text-[#F7DF1E] hover:border-[#F7DF1E]/50" },
  { name: "HTML5", color: "hover:text-[#E34F26] hover:border-[#E34F26]/50" },
  { name: "CSS3", color: "hover:text-[#1572B6] hover:border-[#1572B6]/50" },
  { name: "Node.js", color: "hover:text-[#339933] hover:border-[#339933]/50" },
  { name: "Tailwind CSS", color: "hover:text-[#06B6D4] hover:border-[#06B6D4]/50" },
  { name: "Framer Motion", color: "hover:text-[#0055FF] hover:border-[#0055FF]/50" },
]

export default function TechStack() {
  return (
    <section className="py-24 bg-dark-900 relative border-t border-b border-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/3"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Modern Tech Stack</h2>
            <p className="text-gray-400">
              We leverage the latest technologies to build fast, scalable, and maintainable applications that stand the test of time.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-2/3 flex flex-wrap gap-4 justify-center md:justify-start"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`px-6 py-3 rounded-full bg-dark-800 border border-gray-800 text-gray-300 font-medium transition-colors cursor-default ${tech.color}`}
              >
                {tech.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
