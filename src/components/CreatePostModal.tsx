import React, { useState } from 'react';
import { X, Send, AlertCircle, BookOpen, Briefcase } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserAccount, UserPost } from '../types/index.ts';
import { playChime } from '../utils/soundEffects.ts';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: UserAccount;
  defaultType?: 'aqoon' | 'ganacsi';
  onAddPost: (post: UserPost) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  activeProfile,
  defaultType = 'aqoon',
  onAddPost,
}) => {
  const [postType, setPostType] = useState<'aqoon' | 'ganacsi'>(defaultType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('nolol');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const linesCount = content.split('\n').filter((l) => l.trim().length > 0).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Fadlan geli ciwaanka maqaalka ama fikraddaada.');
      return;
    }
    if (content.trim().length < 50) {
      setError('Fadlan qor qoraal faahfaahsan (ugu yaraan 50 xaraf).');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newPost: UserPost = {
      id: 'post_' + Date.now().toString(36),
      authorId: activeProfile.id,
      authorName: activeProfile.name || 'Isticmaale',
      authorAvatar: activeProfile.avatar || '⭐',
      title: title.trim(),
      category,
      type: postType,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 1,
      tags: tags.length ? tags : [postType === 'aqoon' ? 'Aqoon' : 'Ganacsi'],
      content: content.trim(),
    };

    onAddPost(newPost);
    playChime('success');
    confetti({ particleCount: 70, spread: 80, colors: ['#064E3B', '#10B981', '#F59E0B'] });
    onClose();

    setTitle('');
    setContent('');
    setTagsInput('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#DCE8DF] border border-[#064E3B]/20 rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto text-[#0F172A]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#064E3B]/15 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#10B981]/20 text-[#064E3B] flex items-center justify-center font-bold">
              {postType === 'aqoon' ? <BookOpen className="w-5 h-5 text-[#10B981]" /> : <Briefcase className="w-5 h-5 text-[#10B981]" />}
            </div>
            <div>
              <h3 className="font-serif font-black text-base sm:text-lg text-[#0F172A]">
                Qor & La-wadaag Maqaal
              </h3>
              <p className="text-xs text-[#475569] font-medium">
                Ku darso aqoontaada, waayo-aragnimadaada ama falanqayntaada
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#475569] hover:text-[#0F172A] hover:bg-[#D0DFD4] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-800 text-xs flex items-center gap-2 font-semibold">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Post Type Selector */}
          <div className="flex p-1.5 rounded-2xl bg-[#D0DFD4]">
            <button
              type="button"
              onClick={() => {
                setPostType('aqoon');
                setCategory('nolol');
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                postType === 'aqoon'
                  ? 'bg-[#064E3B] text-white shadow-sm'
                  : 'text-[#0F172A]/70 hover:text-[#0F172A]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>📚 Qoraal Aqoon Guud</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPostType('ganacsi');
                setCategory('ganacsi');
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                postType === 'ganacsi'
                  ? 'bg-[#064E3B] text-white shadow-sm'
                  : 'text-[#0F172A]/70 hover:text-[#0F172A]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>💼 Fikrad / Khibrad Ganacsi</span>
            </button>
          </div>

          {/* Author indicator */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#E5EFE7] text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">{activeProfile.avatar}</span>
              <span className="font-bold text-[#0F172A]">{activeProfile.name}</span>
            </div>
            <span className="text-[11px] text-[#475569] capitalize font-medium">
              Doorka: {activeProfile.role}
            </span>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-[#475569] block mb-1">
              Ciwaanka Maqaalka *
            </label>
            <input
              type="text"
              required
              placeholder={
                postType === 'aqoon'
                  ? 'tusaale: Casharradii aan ka bartay dulqaadka Saxaabada...'
                  : 'tusaale: Sideen u dhisay dakhli ganacsi anigoo isticmaalaya internetka...'
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3.5 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder:text-[#64748B]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-bold text-[#475569] block mb-1">Qeybta</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            >
              {postType === 'aqoon' ? (
                <>
                  <option value="saxaabada">Saxaabada Rasuulka ﷺ</option>
                  <option value="nabiga">Siirada & Noloshii Nabiga ﷺ</option>
                  <option value="dunida">Taariikhda Adduunka & Ilbaxnimooyinka</option>
                  <option value="saynis">Sayniska Casriga ah & Aqoonta Maadiga ah</option>
                  <option value="nolol">Casharrada Nolosha & Horumarka Qofka</option>
                  <option value="xadiis">Axaadiista & Tafsiirka</option>
                </>
              ) : (
                <>
                  <option value="ganacsi">Fikrado & Hal-abuur Ganacsi</option>
                  <option value="suuqgeyn">Suuq-geyn & Korriin (Marketing)</option>
                  <option value="maaliyad">Maareynta Lacagta & Xisaabaadka</option>
                  <option value="startups">Bilowga Shirkadaha & Scaling</option>
                  <option value="ecommerce">Ganacsiga Online-ka ah & E-Commerce</option>
                </>
              )}
            </select>
          </div>

          {/* Content (Textarea) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-[#475569]">
                Qoraalka Faahfaahsan (Qor sheeko, casharro & nuxur dheer) *
              </label>
              <span className="text-[11px] font-bold text-[#064E3B]">
                {linesCount} sadar | {content.length} xaraf
              </span>
            </div>
            <textarea
              required
              rows={8}
              placeholder={
                postType === 'aqoon'
                  ? 'Halkan ku qor nuxurka maqaalkaaga... Waxaad ku dari kartaa qodobo faahfaahsan, taariikh, dhiirrigelin iyo casharro nololeed oo qoto dheer.'
                  : 'Halkan ku qor waayo-aragnimadaada ganacsi, casharradii aad baratay, qaladaadka laga fogaado, ama qaab-dhismeedka iibkaaga...'
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-2xl p-3 text-xs leading-relaxed text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder:text-[#64748B]"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-xs font-bold text-[#475569] block mb-1">
              Calaamadaha (Tags) - ku kala saar kooma (,)
            </label>
            <input
              type="text"
              placeholder="tusaale: Samir, Horumar, Suuqgeyn, Guul"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder:text-[#64748B]"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#475569] hover:text-[#0F172A] hover:bg-[#D0DFD4] transition"
            >
              Ka noqo
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#10B981] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#064E3B]/20 hover:brightness-105 active:scale-95 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Daabac Maqaalka</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
