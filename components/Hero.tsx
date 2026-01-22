
import React from 'react';
import { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  return (
    <section className="relative h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={settings.heroImageUrl} 
          alt="Partnership" 
          className="w-full h-full object-cover brightness-[0.4]"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl">
          <div className="inline-block bg-ktRed text-xs font-bold px-3 py-1 rounded mb-6 tracking-widest uppercase">
            Official Partnership
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            {settings.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-200 mb-10 leading-relaxed">
            {settings.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#consultation" 
              className="px-8 py-4 bg-ktRed text-white text-lg font-bold rounded-lg text-center hover:bg-red-700 transition-all shadow-lg hover:-translate-y-1"
            >
              {settings.buttonLabels.heroConsultation}
            </a>
            <a 
              href="#products" 
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white text-lg font-bold rounded-lg text-center hover:bg-white/20 transition-all"
            >
              {settings.buttonLabels.heroSolutions}
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <i className="fa-solid fa-chevron-down text-white/50 text-2xl"></i>
      </div>
    </section>
  );
};
