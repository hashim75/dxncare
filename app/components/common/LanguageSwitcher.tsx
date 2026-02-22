"use client";

import { useState, useEffect } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { Globe, ChevronDown, Search } from 'lucide-react';

const COOKIE_NAME = "googtrans";

// Expanded language list for global accessibility
const languages = [
  { label: 'English', code: 'en', flag: '🇬🇧' },
  { label: 'Urdu', code: 'ur', flag: '🇵🇰' },
  { label: 'German', code: 'de', flag: '🇩🇪' },
  { label: 'Arabic', code: 'ar', flag: '🇸🇦' },
  { label: 'Spanish', code: 'es', flag: '🇪🇸' },
  { label: 'French', code: 'fr', flag: '🇫🇷' },
  { label: 'Chinese', code: 'zh-CN', flag: '🇨🇳' },
  { label: 'Hindi', code: 'hi', flag: '🇮🇳' },
  { label: 'Portuguese', code: 'pt', flag: '🇵🇹' },
  { label: 'Russian', code: 'ru', flag: '🇷🇺' },
  { label: 'Japanese', code: 'ja', flag: '🇯🇵' },
  { label: 'Korean', code: 'ko', flag: '🇰🇷' },
  { label: 'Italian', code: 'it', flag: '🇮🇹' },
  { label: 'Turkish', code: 'tr', flag: '🇹🇷' },
  { label: 'Dutch', code: 'nl', flag: '🇳🇱' },
  { label: 'Bengali', code: 'bn', flag: '🇧🇩' },
  { label: 'Punjabi', code: 'pa', flag: '🇵🇰' },
  { label: 'Persian', code: 'fa', flag: '🇮🇷' },
];

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies[COOKIE_NAME]) {
      const lang = cookies[COOKIE_NAME].split('/').pop();
      setCurrentLanguage(lang || 'en');
    }
  }, []);

  const switchLanguage = (langCode: string) => {
    // Set cookie for Google Translate engine
    setCookie(null, COOKIE_NAME, `/auto/${langCode}`, { 
        path: '/', 
        maxAge: 30 * 24 * 60 * 60 
    });
    window.location.reload();
  };

  const filteredLanguages = languages.filter(l => 
    l.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentLangObj = languages.find(l => l.code === currentLanguage) || languages[0];

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-500 hover:bg-white transition-all group"
      >
        <Globe size={16} className="text-teal-600 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold text-teal-950 uppercase tracking-wider">
            {currentLangObj.code}
        </span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Search bar inside the dropdown for easy navigation */}
            <div className="p-2 border-b border-slate-50 bg-slate-50/50">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 text-slate-400" size={12} />
                    <input 
                        type="text"
                        placeholder="Search language..."
                        className="w-full pl-7 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-teal-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Scrollable list of languages */}
            <div className="py-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
              {filteredLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    switchLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-teal-50 ${
                    currentLanguage === lang.code ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-600'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="flex-grow text-left">{lang.label}</span>
                  {currentLanguage === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>}
                </button>
              ))}
              {filteredLanguages.length === 0 && (
                <p className="p-4 text-center text-xs text-slate-400 italic">No results found</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}