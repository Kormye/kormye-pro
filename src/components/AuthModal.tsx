import React, { useState, useRef } from 'react';
import { X, ArrowRight, Check, Upload, Camera, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserAccount } from '../types/index.ts';
import { KormyeLogo } from './KormyeLogo.tsx';
import { playChime } from '../utils/soundEffects.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (account: UserAccount) => void;
  activeProfile?: UserAccount;
}

const AVATAR_OPTIONS = ['🌺', '💼', '🎓', '🚀', '📚', '💡', '🕌', '🌟', '🌿', '🎯', '⚡', '🦅'];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
  activeProfile,
}) => {
  const [name, setName] = useState(activeProfile?.name || '');
  const [role, setRole] = useState<'arday' | 'ganacsade' | 'shaqaale' | 'caadi'>(
    activeProfile?.role || 'ganacsade'
  );
  const [avatar, setAvatar] = useState(activeProfile?.avatar || '💼');
  const [photoUrl, setPhotoUrl] = useState<string>(activeProfile?.photoUrl || '');
  const [bio, setBio] = useState(
    activeProfile?.bio || 'Waxaan higsanayaa horumar joogto ah iyo guul maalinle ah.'
  );
  const [primaryGoal, setPrimaryGoal] = useState('Dhisidda qorshe maalinle ah oo joogto ah');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Handle image file upload & convert to Data URL
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Fadlan sawir ka yar 2MB soo geli.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      if (base64) {
        setPhotoUrl(base64);
        setError('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Fadlan qor magacaaga.');
      return;
    }

    const newAccount: UserAccount = {
      id: activeProfile?.id || 'usr_' + Date.now().toString(36),
      name: name.trim(),
      avatar,
      photoUrl: photoUrl.trim() || undefined,
      color: '#064E3B',
      role,
      bio: bio.trim() || primaryGoal,
      createdAt: activeProfile?.createdAt || new Date().toISOString().split('T')[0],
      isRegistered: true,
    };

    playChime('success');
    confetti({ particleCount: 60, spread: 70, colors: ['#064E3B', '#10B981', '#F59E0B'] });
    onRegisterSuccess(newAccount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#DCE8DF] border border-[#064E3B]/20 rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto text-[#0F172A]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-[#475569] hover:text-[#0F172A] hover:bg-[#D0DFD4] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Brand Header */}
        <div className="text-center space-y-2 mb-5">
          <div className="inline-block">
            <KormyeLogo size="md" showText={false} />
          </div>
          <h3 className="font-serif font-black text-xl text-[#0F172A]">
            {activeProfile?.isRegistered ? 'Wax ka beddel Profile-kaaga' : 'Is-diiwaan-geli & Dhis Profile-kaaga'}
          </h3>
          <p className="text-xs text-[#475569] max-w-xs mx-auto font-medium">
            Dhis nidaam kuu gaar ah oo kuu fududeynaya qorshahaaga maalinlaha ah, barashada Quraanka, iyo ganacsiga.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-800 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Photo Upload / Avatar Header with Instagram-style Story Ring */}
          <div className="p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/15 flex items-center gap-3.5">
            <div className="relative shrink-0">
              <div className="p-[2.5px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-emerald-600 shadow-md">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={name || 'Profile'}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#064E3B] border-2 border-white text-white flex items-center justify-center text-2xl font-bold shadow-sm">
                    {avatar}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 p-1 bg-[#10B981] hover:bg-[#059669] text-white rounded-full shadow-md transition active:scale-95 border-2 border-white"
                title="Geli Sawir"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-[#0F172A] block">Sawirka Profile-kaaga</span>
              <p className="text-[11px] text-[#475569] truncate">
                {photoUrl ? 'Sawirkaagu waa diyaar' : 'Geli sawirkaaga ama dooro astaanta hoose'}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded-lg bg-[#064E3B] hover:bg-[#054030] text-white text-[11px] font-bold flex items-center gap-1 transition active:scale-95"
                >
                  <Upload className="w-3 h-3" />
                  <span>Soo Geli Sawir</span>
                </button>
                {photoUrl && (
                  <button
                    type="button"
                    onClick={() => setPhotoUrl('')}
                    className="p-1 rounded-lg text-rose-600 hover:bg-rose-500/15 transition"
                    title="Tirtir sawirka"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-xs font-bold text-[#475569] block mb-1">
              Magacaaga Buuxa *
            </label>
            <input
              type="text"
              required
              placeholder="tusaale: Canab Axmed ama Maxamed Cali"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3.5 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder:text-[#64748B]"
            />
          </div>

          {/* Life Role Selection */}
          <div>
            <label className="text-xs font-bold text-[#475569] block mb-1">
              Doorkaaga Nolosha
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'ganacsade', label: '💼 Ganacsade / Hal-abuur' },
                { id: 'arday', label: '🎓 Arday / Barte' },
                { id: 'shaqaale', label: '⚡ Xirfadle / Shaqaale' },
                { id: 'caadi', label: '🏡 Qoys & Shakhsi' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id as any)}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition flex items-center justify-between ${
                    role === r.id
                      ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-sm'
                      : 'bg-[#E5EFE7] border-[#064E3B]/10 text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  <span>{r.label}</span>
                  {role === r.id && <Check className="w-3.5 h-3.5 text-[#10B981]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Setup Question: Primary Daily Goal */}
          <div>
            <label className="text-xs font-bold text-[#475569] block mb-1">
              🎯 Waa maxay yoolkaaga ugu weyn ee aad doonayso inaad maalin walba ilaaliso?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {[
                '📖 Quraanka & Xuska Alle',
                '💼 Dhisidda Ganacsi & Dakhli',
                '⚡ Barashada Xirfado Casri ah',
                '🌱 Caafimaadka & Jimicsiga',
              ].map((goalOption) => (
                <button
                  key={goalOption}
                  type="button"
                  onClick={() => setPrimaryGoal(goalOption)}
                  className={`p-2 rounded-xl border text-xs font-semibold text-left transition ${
                    primaryGoal === goalOption
                      ? 'bg-[#064E3B] text-white border-[#064E3B]'
                      : 'bg-[#E5EFE7] border-[#064E3B]/10 text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {goalOption}
                </button>
              ))}
            </div>
          </div>

          {/* Avatar Picker */}
          <div>
            <label className="text-xs font-bold text-[#475569] block mb-1">
              Dooro Astaantaada (Avatar)
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATAR_OPTIONS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setAvatar(em)}
                  className={`h-11 rounded-2xl flex items-center justify-center text-xl transition transform active:scale-90 ${
                    avatar === em
                      ? 'bg-[#10B981]/25 border-2 border-[#10B981] shadow-md scale-105'
                      : 'bg-[#E5EFE7] border border-[#064E3B]/15 hover:bg-[#D0DFD4]'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Bio / Motivation */}
          <div>
            <label className="text-xs font-bold text-[#475569] block mb-1">
              Hal-ku-dheggaaga ama Dhiirrigelintaada
            </label>
            <input
              type="text"
              placeholder="tusaale: Joogtayntu waa furaha guusha"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder:text-[#64748B]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-[#064E3B] to-[#10B981] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#064E3B]/25 hover:brightness-105 active:scale-95 transition"
          >
            <span>Diiwaangeli & Fur Boggaaga</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-[#475569] text-center mt-3 font-medium">
          App-ku kuma waydiinayo xog dheeraad ah ama scan been ah — waa toos iyo fudeyd.
        </p>
      </div>
    </div>
  );
};
