
import React from 'react';
import { Product } from '../types';

interface ProductSectionProps {
  products: Product[];
}

export const ProductSection: React.FC<ProductSectionProps> = ({ products }) => {
  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-ktRed font-bold text-lg mb-2 tracking-widest uppercase">Smart Solutions</h2>
          <p className="text-4xl font-black text-gray-900 mb-4">KT 프랜차이즈 전용 상품</p>
          <div className="w-12 h-1 bg-ktRed mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-ktRed text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                  <i className={`${product.icon}`}></i>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                  {product.description}
                </p>
                <a 
                  href={product.linkUrl} 
                  className="w-full py-3 bg-gray-50 text-gray-700 font-semibold rounded-lg group-hover:bg-ktRed group-hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  자세히 보기 <i className="fa-solid fa-arrow-right text-xs"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
