import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import InteractiveHero from './components/InteractiveHero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingAssistant from './components/FloatingAssistant';
import CosmicBackground from './components/CosmicBackground';
import AdminLogin from './components/admin/AdminLogin';
import Dashboard from './components/admin/Dashboard';
import ProjectUpload from './components/client/ProjectUpload';
import ClientAuth from './components/client/ClientAuth';
import Chat from './components/client/Chat';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          
          {/* Client Routes */}
          <Route path="/client/login" element={<ClientAuth />} />
          <Route path="/client/upload" element={<ProjectUpload />} />
          <Route path="/client/chat" element={<Chat />} />
          
          {/* Main Site Route */}
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-slate-900/95 text-white relative">
                <CosmicBackground />
                <Header />
                <main className="relative">
                  <InteractiveHero />
                  <Services />
                  <Portfolio />
                  <Contact />
                </main>
                <Footer />
                <FloatingAssistant />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;