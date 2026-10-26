import React, { useState } from 'react';
import { X, UserPlus, Check, Trash2, Users, Sparkles, Edit3 } from 'lucide-react';
import { UserAccount } from '../types/index.ts';

interface ProfileSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: UserAccount[];
  activeProfileId: string;
  onSelectProfile: (profileId: string) => void;
  onCreateProfile: (profile: UserAccount) => void;
  onDeleteProfile: (profileId: string) => void;
  onOpenRegister?: () => void;
}

const AVATAR_OPTIONS = ['🌺', '💼', '🎓', '🧔', '👩‍💻', '👨‍🏫', '🚀', '⭐', '📖', '🕌', '🌿', '⚡'];
const COLOR_OPTIONS = ['#064E3B', '#10B981', '#047857', '#059669', '#F59E0B'];

export const ProfileSwitcherModal: React.FC<ProfileSwitcherModalProps> = ({
  isOpen,
  onClose,
  profiles,
  activeProfileId,
  onSelectProfile,
  onCreateProfile,
  onDeleteProfile,
  onOpenRegister,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('🌺');
  const [newColor, setNewColor] = useState('#064E3B');
  const [newRole, setNewRole] = useState<'arday' | 'ganacsade' | 'shaqaale' | 'caadi'>('ganacsade');

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newProfile: UserAccount = {
      id: 'p_' + Date.now().toString(36),
      name: newName.trim(),
      avatar: newAvatar,
      color: newColor,
      role: newRole,
      bio: 'Qof cusub oo ku soo biiray nidaamka guusha.',
      createdAt: new Date().toISOString(),
      isRegistered: true,
    };

    onCreateProfile(newProfile);
    setIsCreating(false);
    setNewName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#DCE8DF] border border-[#064E3B]/20 rounded-3xl p-5 shadow-2xl text-[#0F172A] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#064E3B]/15">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#10B981]/20 text-[#064E3B] flex items-center justify-center font-bold">
              <Users className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <h3 className="font-serif font-black text-base sm:text-lg text-[#0F172A]">
                Xisaabaadka & Qoyska
              </h3>
              <p className="text-xs text-[#475569] font-medium">Qof kastaa wuxuu leeyahay jadwal iyo horumar u gaar ah</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[#D0DFD4] text-[#475569] hover:text-[#0F172A] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {/* Active / Available Profiles */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#475569] uppercase tracking-wider">
              <span>Isticmaalayaasha diiwaangashan ({profiles.length})</span>
              {onOpenRegister && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenRegister();
                  }}
                  className="text-[11px] font-bold text-[#064E3B] hover:text-[#10B981] hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Wax ka beddel Profile</span>
                </button>
              )}
            </div>

            {profiles.map((p) => {
              const isActive = p.id === activeProfileId;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProfile(p.id);
                    onClose();
                  }}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-200 border ${
                    isActive
                      ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#0F172A] shadow-sm'
                      : 'bg-[#E5EFE7] border-[#064E3B]/10 hover:border-[#10B981]/30 text-[#0F172A]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-[#10B981]/30 bg-[#10B981]/15"
                    >
                      {p.avatar || '👤'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#0F172A]">{p.name}</span>
                        {isActive && (
                          <span className="text-[10px] bg-[#10B981]/25 text-[#064E3B] px-2 py-0.5 rounded-full font-bold">
                            Hadda furan
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#475569] capitalize font-medium">
                        {p.role === 'arday'
                          ? 'Arday / Waxbarasho'
                          : p.role === 'ganacsade'
                          ? 'Ganacsade / Hal-abuur'
                          : p.role === 'shaqaale'
                          ? 'Xirfadle'
                          : 'Isticmaale guud'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {isActive ? (
                      <div className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          onSelectProfile(p.id);
                          onClose();
                        }}
                        className="text-xs bg-[#DCE8DF] hover:bg-[#D0DFD4] text-[#0F172A] px-3 py-1.5 rounded-xl font-bold border border-[#064E3B]/15 transition"
                      >
                        Geli
                      </button>
                    )}

                    {p.id !== 'p_default' && profiles.length > 1 && (
                      <button
                        onClick={() => onDeleteProfile(p.id)}
                        className="p-1.5 rounded-lg text-rose-600/70 hover:text-rose-600 hover:bg-rose-500/10 transition"
                        title="Tirtir xisaabtan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Profile Section */}
          {!isCreating ? (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-dashed border-[#064E3B]/30 hover:border-[#10B981] text-[#064E3B] bg-[#10B981]/10 hover:bg-[#10B981]/15 transition font-bold text-xs"
            >
              <UserPlus className="w-4 h-4 text-[#10B981]" />
              <span>+ Ku dar qof kale (Profile Cusub)</span>
            </button>
          ) : (
            <form onSubmit={handleCreate} className="p-4 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/15 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#064E3B] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#10B981]" /> Abuuro Profile Cusub
                </span>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="text-xs text-[#475569] hover:text-[#0F172A]"
                >
                  Ka noqo
                </button>
              </div>

              <div>
                <label className="text-xs text-[#475569] font-semibold block mb-1">Magaca qofka</label>
                <input
                  type="text"
                  required
                  placeholder="tusaale: Axmed Cabdi ama Hooyo"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#DCE8DF] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>

              <div>
                <label className="text-xs text-[#475569] font-semibold block mb-1.5">Dooro Astaanta (Avatar)</label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setNewAvatar(av)}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition ${
                        newAvatar === av
                          ? 'bg-[#10B981]/25 text-white scale-110 shadow-md ring-2 ring-[#10B981]'
                          : 'bg-[#DCE8DF] hover:bg-[#D0DFD4] border border-[#064E3B]/15'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-[#475569] font-semibold block mb-1">Doorka</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full bg-[#DCE8DF] border border-[#064E3B]/15 rounded-xl px-2.5 py-2 text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                  >
                    <option value="caadi">Caadi</option>
                    <option value="arday">Arday</option>
                    <option value="ganacsade">Ganacsade</option>
                    <option value="shaqaale">Shaqaale</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#475569] font-semibold block mb-1">Midabka</label>
                  <div className="flex items-center gap-1.5 pt-1.5">
                    {COLOR_OPTIONS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setNewColor(c)}
                        className={`w-6 h-6 rounded-full transition ${
                          newColor === c ? 'ring-2 ring-[#10B981] scale-110' : 'opacity-80'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#10B981] text-white font-bold text-xs shadow-md shadow-[#064E3B]/20 hover:brightness-105 active:scale-95 transition"
              >
                Keydi oo Fur Qofkan Cusub
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-[#064E3B]/15 text-center">
          <p className="text-[11px] text-[#475569] font-medium">
            Dhammaan macluumaadka waxaa si ammaan ah loogu kaydiyaa qalabkaaga.
          </p>
        </div>
      </div>
    </div>
  );
};
