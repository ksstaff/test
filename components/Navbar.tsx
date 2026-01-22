
import React from 'react';
import { SiteSettings } from '../types';

interface NavbarProps {
  settings: SiteSettings;
  onAdminClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ settings, onAdminClick }) => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // If you want to force navigation to root in a generic way:
    // window.location.href = window.location.pathname; 
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a 
            href="#" 
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="text-ktRed font-black text-2xl tracking-tighter">
              등촌샤브<span className="text-ktDark">칼국수</span>
            </div>
            <div className="h-6 w-px bg-gray-300 mx-2"></div>
            <div className="text-ktRed font-bold text-xl italic">KT</div>
          </a>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-700">
            <a href="#products" className="hover:text-ktRed transition-colors">솔루션 안내</a>
            <a href="#news" className="hover:text-ktRed transition-colors">공지사항</a>
            <a href="#consultation" className="bg-ktRed text-white px-5 py-2.5 rounded-full hover:bg-red-700 transition-all shadow-md active:scale-95">
              {settings.buttonLabels.navConsultation}
            </a>
            <button 
              onClick={onAdminClick}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="관리자 페이지"
            >
              <i className="fa-solid fa-gear"></i>
            </button>
          </div>
          
          <div className="md:hidden flex items-center gap-4">
             <a href="#consultation" className="bg-ktRed text-white px-3 py-1.5 rounded-full text-xs font-bold">
              {settings.buttonLabels.navConsultation}
            </a>
            <button onClick={onAdminClick} className="text-gray-500 p-2">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
