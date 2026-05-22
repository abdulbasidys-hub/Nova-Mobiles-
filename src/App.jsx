import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Shop from './pages/Shop'
import PhoneDetail from './pages/PhoneDetail'
import About from './pages/About'
import PixelGuide from './pages/PixelGuide'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/shop"         element={<Shop />} />
        <Route path="/shop/:slug"   element={<PhoneDetail />} />
        <Route path="/about"        element={<About />} />
        <Route path="/pixel-guide"  element={<PixelGuide />} />
        <Route path="/contact"      element={<Contact />} />
        <Route path="/admin"        element={<Admin />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </ThemeProvider>
  )
}
