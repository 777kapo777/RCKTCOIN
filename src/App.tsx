import React, { useState } from 'react';
import { ArrowRight, Users, Info, Target, Menu, X } from 'lucide-react';
import Scene3D from './components/Scene3D';
import Logo from './components/Logo';
import LanguageSwitch from './components/LanguageSwitch';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    const buySection = document.getElementById('buy');
    buySection?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 w-full h-[150vh]">
        <Scene3D />
      </div>
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-16 pb-20 relative z-10">
        <nav className="flex justify-between items-center mb-24">
          <div className="flex items-center gap-2">
            <Logo className="w-10 h-10 text-blue-500" />
            <span className="text-2xl font-bold">ROCKETCOIN</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="hover:text-blue-400 transition">{t.nav.about}</a>
            <a href="#community" className="hover:text-blue-400 transition">{t.nav.community}</a>
            <a href="#launch-strategy" className="hover:text-blue-400 transition">{t.nav.launchStrategy}</a>
            <LanguageSwitch />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-slate-900/95 z-50 flex flex-col items-center justify-center">
            <button 
              className="absolute top-6 right-6 text-white p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center gap-8 text-xl">
              <a 
                href="#about" 
                className="hover:text-blue-400 transition py-2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }}
              >
                {t.nav.about}
              </a>
              <a 
                href="#community" 
                className="hover:text-blue-400 transition py-2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('community');
                }}
              >
                {t.nav.community}
              </a>
              <a 
                href="#launch-strategy" 
                className="hover:text-blue-400 transition py-2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('launch-strategy');
                }}
              >
                {t.nav.launchStrategy}
              </a>
              <LanguageSwitch />
              <button 
                onClick={scrollToBuy}
                className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full flex items-center gap-2 transition mt-4"
              >
                {t.hero.buyButton} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6">
            {t.hero.title}
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            {t.hero.description}
          </p>
          <div className="flex justify-center">
            <button 
              onClick={scrollToBuy}
              className="bg-blue-500 hover:bg-blue-600 px-12 py-4 rounded-full flex items-center gap-2 transition text-lg font-semibold"
            >
              {t.hero.buyButton} <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Buy Section */}
      <section id="buy" className="py-20 bg-slate-800/50 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">{t.buy.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <a 
              href="https://pump.fun/board"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700/50 p-8 rounded-2xl backdrop-blur-sm hover:bg-slate-700/70 transition cursor-pointer"
            >
              <img 
                src="https://i.ibb.co/Ndh4Xhjh/Pump-fun-logo.png" 
                alt="Pump.fun" 
                className="w-12 h-12 mb-4"
              />
              <h3 className="text-2xl font-bold mb-4">Pump.fun</h3>
              <p className="text-gray-300">
                {t.buy.pumpFun.description}
              </p>
            </a>
            <a 
              href="https://t.me/blum/app?startapp=memepadjetton"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700/50 p-8 rounded-2xl backdrop-blur-sm hover:bg-slate-700/70 transition cursor-pointer"
            >
              <img 
                src="https://i.ibb.co/7xV2WQ7F/blum.png" 
                alt="Blum" 
                className="w-12 h-12 mb-4"
              />
              <h3 className="text-2xl font-bold mb-4">Blum</h3>
              <p className="text-gray-300">
                {t.buy.blum.description}
              </p>
            </a>
            <div className="bg-slate-700/50 p-8 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-500">...</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.buy.soon.title}</h3>
              <p className="text-gray-300">
                {t.buy.soon.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">{t.about.title}</h2>
          <div className="max-w-3xl mx-auto bg-slate-700/50 p-8 rounded-2xl backdrop-blur-sm">
            <p className="text-lg text-gray-300 leading-relaxed flex items-start gap-4">
              <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              {t.about.description}
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">{t.community.title}</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="bg-slate-700/50 p-8 rounded-2xl backdrop-blur-sm flex items-center gap-4">
              <Users className="w-8 h-8 text-blue-500" />
              <div className="text-left">
                <h3 className="font-bold">{t.community.question}</h3>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://t.me/officalrocketcoin" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full transition text-center"
              >
                {t.community.joinTelegram}
              </a>
              <a 
                href="https://discord.gg/pFEM9dkG" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full transition text-center"
              >
                {t.community.joinDiscord}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Launch Strategy Section */}
      <section id="launch-strategy" className="py-20 bg-slate-800/50 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">{t.launchStrategy.title}</h2>
          <div className="max-w-3xl mx-auto bg-slate-700/50 p-8 rounded-2xl backdrop-blur-sm">
            <div className="flex flex-col gap-6">
              {t.launchStrategy.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Target className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <p className="text-lg text-gray-300">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Logo className="w-6 h-6 text-blue-500" />
              <span className="font-bold">ROCKETCOIN</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-sm text-gray-400">
              <span>{t.footer.contact}</span>
              <span className="text-blue-400">officalrocketcoin@outlook.com</span>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © 2025 ROCKETCOIN. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;