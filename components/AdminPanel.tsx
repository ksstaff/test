
import React, { useState } from 'react';
import { SiteSettings, NewsPost, Consultation, Product } from '../types';

interface AdminPanelProps {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  news: NewsPost[];
  setNews: React.Dispatch<React.SetStateAction<NewsPost[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  consultations: Consultation[];
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  settings, setSettings, news, setNews, products, setProducts, consultations, onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'news' | 'products' | 'consultations' | 'integration' | 'buttons' | 'footer'>('content');
  const [editingNews, setEditingNews] = useState<Partial<NewsPost> | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert('저장되었습니다.');
  };

  const handleDeleteNews = (id: string) => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      setNews(news.filter(n => n.id !== id));
    }
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews?.title || !editingNews?.content) return;

    if (editingNews.id) {
      setNews(news.map(n => n.id === editingNews.id ? (editingNews as NewsPost) : n));
    } else {
      const newNode: NewsPost = {
        id: Date.now().toString(),
        title: editingNews.title,
        content: editingNews.content,
        date: new Date().toISOString().split('T')[0],
        imageUrl: editingNews.imageUrl || 'https://picsum.photos/800/600',
      };
      setNews([newNode, ...news]);
    }
    setEditingNews(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('상품을 삭제하시겠습니까?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name) return;

    if (editingProduct.id) {
      setProducts(products.map(p => p.id === editingProduct.id ? (editingProduct as Product) : p));
    } else {
      const newProd: Product = {
        id: Date.now().toString(),
        name: editingProduct.name,
        description: editingProduct.description || '',
        image: editingProduct.image || 'https://picsum.photos/800/600',
        icon: editingProduct.icon || 'fa-solid fa-cube',
        linkUrl: editingProduct.linkUrl || '#consultation'
      };
      setProducts([...products, newProd]);
    }
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white fixed h-full z-10 overflow-y-auto">
        <div className="p-8 border-b border-white/10">
          <button 
            onClick={onLogout}
            className="text-left hover:opacity-80 transition-opacity"
          >
            <div className="text-xl font-black italic text-ktRed">KT <span className="text-white">Admin</span></div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Exit to Public Site</div>
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'content' ? 'bg-ktRed' : 'hover:bg-white/5 text-gray-400'}`}>
            <i className="fa-solid fa-sliders"></i> 콘텐츠 관리
          </button>
          <button onClick={() => setActiveTab('news')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'news' ? 'bg-ktRed' : 'hover:bg-white/5 text-gray-400'}`}>
            <i className="fa-solid fa-newspaper"></i> 게시글 관리
          </button>
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-ktRed' : 'hover:bg-white/5 text-gray-400'}`}>
            <i className="fa-solid fa-box"></i> 상품 관리
          </button>
          <button onClick={() => setActiveTab('buttons')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'buttons' ? 'bg-ktRed' : 'hover:bg-white/5 text-gray-400'}`}>
            <i className="fa-solid fa-i-cursor"></i> 버튼 이름 관리
          </button>
          <button onClick={() => setActiveTab('footer')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'footer' ? 'bg-ktRed' : 'hover:bg-white/5 text-gray-400'}`}>
            <i className="fa-solid fa-window-maximize"></i> 푸터 정보 관리
          </button>
          <button onClick={() => setActiveTab('consultations')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'consultations' ? 'bg-ktRed' : 'hover:bg-white/5 text-gray-400'}`}>
            <i className="fa-solid fa-clipboard-list"></i> 상담 내역
          </button>
          <button onClick={() => setActiveTab('integration')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'integration' ? 'bg-ktRed' : 'hover:bg-white/5 text-gray-400'}`}>
            <i className="fa-solid fa-link"></i> 구글 연동
          </button>
        </nav>
        <div className="p-4 mt-10">
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> 로그아웃
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="ml-64 flex-grow p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900">
            {activeTab === 'content' && '기본 콘텐츠 관리'}
            {activeTab === 'news' && '홍보글 관리 (이미지 업로드)'}
            {activeTab === 'products' && '상품 및 연결 링크 관리'}
            {activeTab === 'buttons' && '전체 버튼 이름 관리'}
            {activeTab === 'footer' && '푸터 정보 관리'}
            {activeTab === 'consultations' && '상담 신청 내역'}
            {activeTab === 'integration' && '구글 시트 및 메일 연동'}
          </h1>
        </header>

        {activeTab === 'content' && (
          <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl p-8 max-w-4xl space-y-6 shadow-sm border border-gray-200">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">공지 띠배너 문구 (애니메이션 적용)</label>
              <input type="text" value={settings.announcement} onChange={e => setSettings({...settings, announcement: e.target.value})} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-ktRed" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">히어로 제목</label>
                <input type="text" value={settings.heroTitle} onChange={e => setSettings({...settings, heroTitle: e.target.value})} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-ktRed" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">히어로 배경 이미지 업로드</label>
                 <input type="file" accept="image/*" onChange={e => handleFileUpload(e, (url) => setSettings({...settings, heroImageUrl: url}))} className="w-full text-xs" />
              </div>
            </div>
            <button type="submit" className="px-6 py-2 bg-ktRed text-white font-bold rounded">저장하기</button>
          </form>
        )}

        {activeTab === 'news' && (
          <div className="space-y-6">
            <button onClick={() => setEditingNews({})} className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold">새 소식 추가</button>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y">
              {news.map(n => (
                <div key={n.id} className="p-6 flex justify-between items-center">
                   <div className="flex gap-4 items-center">
                     <img src={n.imageUrl} className="w-16 h-16 object-cover rounded" />
                     <div>
                       <div className="font-bold">{n.title}</div>
                       <div className="text-xs text-gray-400">{n.date}</div>
                     </div>
                   </div>
                   <div className="space-x-4">
                     <button onClick={() => setEditingNews(n)} className="text-blue-500 font-bold">수정</button>
                     <button onClick={() => handleDeleteNews(n.id)} className="text-ktRed font-bold">삭제</button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <button onClick={() => setEditingProduct({})} className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold">상품 추가</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                   <div className="flex gap-4 mb-4">
                     <img src={p.image} className="w-20 h-20 object-cover rounded" />
                     <div>
                       <div className="font-bold text-lg">{p.name}</div>
                       <div className="text-xs text-blue-500 break-all">{p.linkUrl}</div>
                     </div>
                   </div>
                   <div className="flex justify-end gap-3">
                     <button onClick={() => setEditingProduct(p)} className="text-sm font-bold px-3 py-1 bg-gray-100 rounded">수정</button>
                     <button onClick={() => handleDeleteProduct(p.id)} className="text-sm font-bold px-3 py-1 bg-red-50 text-ktRed rounded">삭제</button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'buttons' && (
          <form onSubmit={handleSaveSettings} className="bg-white p-8 rounded-2xl space-y-6 shadow-sm border border-gray-200">
             <div className="grid grid-cols-2 gap-6">
               <div>
                 <label className="block text-xs font-bold text-gray-400 uppercase mb-2">네비게이션 상담 신청 버튼</label>
                 <input type="text" value={settings.buttonLabels.navConsultation} onChange={e => setSettings({...settings, buttonLabels: {...settings.buttonLabels, navConsultation: e.target.value}})} className="w-full p-3 border rounded-lg" />
               </div>
               <div>
                 <label className="block text-xs font-bold text-gray-400 uppercase mb-2">히어로 상담 예약 버튼</label>
                 <input type="text" value={settings.buttonLabels.heroConsultation} onChange={e => setSettings({...settings, buttonLabels: {...settings.buttonLabels, heroConsultation: e.target.value}})} className="w-full p-3 border rounded-lg" />
               </div>
               <div>
                 <label className="block text-xs font-bold text-gray-400 uppercase mb-2">히어로 솔루션 상세 버튼</label>
                 <input type="text" value={settings.buttonLabels.heroSolutions} onChange={e => setSettings({...settings, buttonLabels: {...settings.buttonLabels, heroSolutions: e.target.value}})} className="w-full p-3 border rounded-lg" />
               </div>
               <div>
                 <label className="block text-xs font-bold text-gray-400 uppercase mb-2">상담 폼 신청 완료 버튼</label>
                 <input type="text" value={settings.buttonLabels.submitConsultation} onChange={e => setSettings({...settings, buttonLabels: {...settings.buttonLabels, submitConsultation: e.target.value}})} className="w-full p-3 border rounded-lg" />
               </div>
             </div>
             <button type="submit" className="px-6 py-2 bg-ktRed text-white font-bold rounded">버튼 텍스트 저장</button>
          </form>
        )}

        {activeTab === 'footer' && (
          <form onSubmit={handleSaveSettings} className="bg-white p-8 rounded-2xl space-y-6 shadow-sm border border-gray-200">
             <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">푸터 설명 문구</label>
                <textarea rows={3} value={settings.footer.description} onChange={e => setSettings({...settings, footer: {...settings.footer, description: e.target.value}})} className="w-full p-3 border rounded-lg" />
             </div>
             <div className="grid grid-cols-3 gap-6">
               <div>
                 <label className="block text-xs font-bold text-gray-400 uppercase mb-2">KT 솔루션 상담번호</label>
                 <input type="text" value={settings.footer.supportPhone} onChange={e => setSettings({...settings, footer: {...settings.footer, supportPhone: e.target.value}})} className="w-full p-3 border rounded-lg" />
               </div>
               <div>
                 <label className="block text-xs font-bold text-gray-400 uppercase mb-2">등촌 가맹본부 번호</label>
                 <input type="text" value={settings.footer.hqPhone} onChange={e => setSettings({...settings, footer: {...settings.footer, hqPhone: e.target.value}})} className="w-full p-3 border rounded-lg" />
               </div>
               <div>
                 <label className="block text-xs font-bold text-gray-400 uppercase mb-2">고장 장애 번호</label>
                 <input type="text" value={settings.footer.faultPhone} onChange={e => setSettings({...settings, footer: {...settings.footer, faultPhone: e.target.value}})} className="w-full p-3 border rounded-lg" />
               </div>
             </div>
             <button type="submit" className="px-6 py-2 bg-ktRed text-white font-bold rounded">푸터 정보 저장</button>
          </form>
        )}

        {activeTab === 'consultations' && (
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
             <table className="w-full text-sm text-left">
               <thead>
                 <tr className="border-b text-gray-400 font-bold uppercase">
                   <th className="pb-3 px-2">일시</th>
                   <th className="pb-3 px-2">매장</th>
                   <th className="pb-3 px-2">신청자</th>
                   <th className="pb-3 px-2">연락처</th>
                   <th className="pb-3 px-2">관심 품목</th>
                 </tr>
               </thead>
               <tbody>
                 {consultations.map(c => (
                   <tr key={c.id} className="border-b hover:bg-gray-50">
                     <td className="py-3 px-2 text-xs text-gray-400">{c.createdAt}</td>
                     <td className="py-3 px-2 font-bold">{c.storeName}</td>
                     <td className="py-3 px-2">{c.customerName}</td>
                     <td className="py-3 px-2 font-mono">{c.phoneNumber}</td>
                     <td className="py-3 px-2">
                       <div className="flex gap-1 flex-wrap">
                         {c.interests.map(i => (
                           <span key={i} className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-600">{i}</span>
                         ))}
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        )}

        {activeTab === 'integration' && (
          <div className="space-y-8 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-lg font-bold mb-6 border-b pb-2 flex items-center gap-2">
                <i className="fa-solid fa-bolt text-yellow-500"></i> 외부 연동 설정 (Webhook)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Google Apps Script Web App URL</label>
                  <input 
                    type="text" 
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={settings.webhookUrl}
                    onChange={e => setSettings({...settings, webhookUrl: e.target.value})}
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-ktRed font-mono text-sm"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    상담 신청 시 구글 시트에 행을 추가하고 이메일을 발송하기 위한 엔드포인트 URL을 입력하세요.
                  </p>
                </div>
                <div className="pt-4">
                   <button 
                    onClick={() => alert('Webhook 설정이 업데이트 되었습니다.')}
                    className="px-6 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-all"
                  >
                    설정 업데이트
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
              <h3 className="text-blue-900 font-bold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-circle-info"></i> 구글 시트/메일 연동 가이드
              </h3>
              <ol className="text-sm text-blue-800 space-y-3 list-decimal ml-4 leading-relaxed">
                <li>구글 시트를 생성하고 <b>확장 프로그램 &gt; Apps Script</b>를 엽니다.</li>
                <li>아래 코드를 복사하여 붙여넣고 <b>배포 &gt; 새 배포 (웹 앱)</b>를 실행합니다.</li>
                <li>액세스 권한을 "모든 사람(Anyone)"으로 설정하고 생성된 URL을 위 필드에 입력하세요.</li>
              </ol>
              <pre className="mt-6 p-4 bg-blue-900/5 rounded-lg text-xs font-mono overflow-x-auto text-blue-900 border border-blue-200">
{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // 1. 구글 시트에 행 추가
  sheet.appendRow([
    new Date(), 
    data.storeName, 
    data.customerName, 
    data.phoneNumber, 
    data.interests.join(", ")
  ]);
  
  // 2. 이메일 발송
  MailApp.sendEmail({
    to: "본인이메일@gmail.com",
    subject: "[등촌xKT] 새로운 상담 신청: " + data.storeName,
    body: "매장명: " + data.storeName + "\\n신청자: " + data.customerName + "\\n연락처: " + data.phoneNumber + "\\n관심상품: " + data.interests.join(", ")
  });
  
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}`}
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* Modals for Editing News/Products */}
      {editingNews && (
        <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleSaveNews} className="bg-white p-8 rounded-2xl w-full max-w-lg space-y-4">
            <h2 className="text-xl font-bold">홍보글 설정</h2>
            <input type="text" placeholder="제목" value={editingNews.title || ''} onChange={e => setEditingNews({...editingNews, title: e.target.value})} className="w-full p-3 border rounded" />
            <textarea placeholder="내용" value={editingNews.content || ''} onChange={e => setEditingNews({...editingNews, content: e.target.value})} className="w-full p-3 border rounded" rows={4} />
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase">이미지 업로드 (PC 파일 선택)</label>
              <input type="file" accept="image/*" onChange={e => handleFileUpload(e, (url) => setEditingNews({...editingNews, imageUrl: url}))} className="text-xs" />
            </div>
            <div className="flex gap-2 pt-4">
              <button type="submit" className="flex-grow bg-ktRed text-white p-3 rounded font-bold">저장</button>
              <button type="button" onClick={() => setEditingNews(null)} className="px-6 bg-gray-100 p-3 rounded font-bold">취소</button>
            </div>
          </form>
        </div>
      )}

      {editingProduct && (
        <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleSaveProduct} className="bg-white p-8 rounded-2xl w-full max-w-lg space-y-4 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold">상품 설정</h2>
            <input type="text" placeholder="상품명" value={editingProduct.name || ''} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full p-3 border rounded" />
            <textarea placeholder="설명" value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full p-3 border rounded" rows={3} />
            <input type="text" placeholder="아이콘 클래스 (예: fa-solid fa-robot)" value={editingProduct.icon || ''} onChange={e => setEditingProduct({...editingProduct, icon: e.target.value})} className="w-full p-3 border rounded" />
            <input type="text" placeholder="연결 페이지 URL (예: #consultation)" value={editingProduct.linkUrl || ''} onChange={e => setEditingProduct({...editingProduct, linkUrl: e.target.value})} className="w-full p-3 border rounded" />
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase">이미지 업로드</label>
              <input type="file" accept="image/*" onChange={e => handleFileUpload(e, (url) => setEditingProduct({...editingProduct, image: url}))} className="text-xs" />
            </div>
            <div className="flex gap-2 pt-4">
              <button type="submit" className="flex-grow bg-ktRed text-white p-3 rounded font-bold">저장</button>
              <button type="button" onClick={() => setEditingProduct(null)} className="px-6 bg-gray-100 p-3 rounded font-bold">취소</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
