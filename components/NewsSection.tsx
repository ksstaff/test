
import React from 'react';
import { NewsPost } from '../types';

interface NewsSectionProps {
  news: NewsPost[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  return (
    <section id="news" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-ktRed font-bold text-lg mb-2 tracking-widest uppercase">Latest Updates</h2>
            <p className="text-4xl font-black text-gray-900">최신 소식 및 공지</p>
          </div>
          <button className="text-gray-400 hover:text-ktRed transition-colors font-medium">전체보기 +</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((post) => (
            <div key={post.id} className="flex flex-col md:flex-row bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-ktRed/30 transition-colors shadow-sm">
              <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-ktRed font-bold mb-2 block">{post.date}</span>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">{post.content}</p>
                </div>
                <button className="mt-4 text-gray-900 font-bold text-sm hover:text-ktRed inline-flex items-center gap-1">
                  Read more <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
