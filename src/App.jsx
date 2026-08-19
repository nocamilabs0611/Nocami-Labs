import Hero from './components/Hero'
import Services from './components/Services'
import TechStack from './components/TechStack'
import Contact from './components/Contact'

function App() {
  return (
    <div className="bg-dark-900 min-h-screen text-white font-sans selection:bg-accent-blue/30">
      <main>
        <Hero />
        <Services />
        <TechStack />
        <Contact />
      </main>
      
      <footer className="py-8 border-t border-gray-800 bg-dark-900 text-center text-gray-500 text-sm relative z-10">
        <p>&copy; {new Date().getFullYear()} Nocami Labs. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
