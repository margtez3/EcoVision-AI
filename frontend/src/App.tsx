import Navbar from './components/NavBar.tsx'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0f0a]">
      <Navbar />
      <Home />
    </div>
  )
}