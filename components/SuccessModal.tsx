
import React from 'react';

interface SuccessModalProps {
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center transform animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          <i className="fa-solid fa-check"></i>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-4">상담이 접수되었습니다</h2>
        <p className="text-gray-500 leading-relaxed mb-8">
          프랜차이즈 담당자를 통해서<br />빠르게 연락드리겠습니다.
        </p>
        <button 
          onClick={onClose}
          className="w-full py-4 bg-ktRed text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg active:scale-95"
        >
          확인
        </button>
      </div>
    </div>
  );
};
