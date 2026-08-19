import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [focusedField, setFocusedField] = useState(null)

  return (
    <section className="py-24 relative bg-dark-900">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent-blue/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Let's Build Together
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Ready to transform your ideas into reality? Get in touch with us.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-dark-800/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden"
        >
          <form className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors relative z-10"
                  placeholder="John Doe"
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
                <motion.div 
                  className="absolute inset-0 -z-0 rounded-xl bg-accent-blue opacity-0"
                  animate={{ opacity: focusedField === 'name' ? 0.5 : 0, scale: focusedField === 'name' ? 1.02 : 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ filter: 'blur(8px)' }}
                />
              </div>
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-dark-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors relative z-10"
                  placeholder="john@example.com"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
                <motion.div 
                  className="absolute inset-0 -z-0 rounded-xl bg-accent-purple opacity-0"
                  animate={{ opacity: focusedField === 'email' ? 0.5 : 0, scale: focusedField === 'email' ? 1.02 : 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ filter: 'blur(8px)' }}
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea 
                rows="4"
                className="w-full bg-dark-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors relative z-10 resize-none"
                placeholder="Tell us about your project..."
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
              ></textarea>
              <motion.div 
                className="absolute inset-0 -z-0 rounded-xl bg-accent-cyan opacity-0"
                animate={{ opacity: focusedField === 'message' ? 0.5 : 0, scale: focusedField === 'message' ? 1.01 : 1 }}
                transition={{ duration: 0.2 }}
                style={{ filter: 'blur(8px)' }}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-dark-900 font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Send Message
              <Send className="w-5 h-5" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
