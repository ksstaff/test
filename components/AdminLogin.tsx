
import React, { useState } from 'react';

interface AdminLoginProps {
  onClose: () => void;
  onSubmit: (password: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onClose, onSubmit }) => {
  const [pass, setPass] = useState('');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-gray-900">Admin Login</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-8">관리자 전용 대시보드 진입을 위해 비밀번호를 입력해 주세요. (Default: 8999)</p>
        
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(pass); }} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Access Key</label>
            <input 
              autoFocus
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              className="w-full px-4 py-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-ktRed text-center text-2xl tracking-[0.5em] outline-none"
              placeholder="••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg active:scale-95"
          >
            대시보드 접속
          </button>
        </form>
      </div>
    </div>
  );
};
