import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Trash2,
  Pencil,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { CustomReminder, RoutineItem } from '../types/index.ts';
import { formatTimeDisplay, triggerPushNotification } from '../utils/storage.ts';

interface RemindersModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminders: CustomReminder[];
  plan: RoutineItem[];
  is12h: boolean;
  onSaveReminders: (reminders: CustomReminder[]) => void;
}

export const RemindersModal: React.FC<RemindersModalProps> = ({
  isOpen,
  onClose,
  reminders,
  plan,
  is12h,
  onSaveReminders,
}) => {
  const [editingReminder, setEditingReminder] = useState<CustomReminder | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleToggleReminder = (id: string) => {
    const updated = reminders.map((r) =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    onSaveReminders(updated);
  };

  const handleDeleteReminder = (id: string) => {
    const updated = reminders.filter((r) => r.id !== id);
    onSaveReminders(updated);
    if (editingReminder?.id === id) {
      setEditingReminder(null);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReminder || !editingReminder.title.trim()) return;

    let updated: CustomReminder[];
    if (isNew) {
      updated = [...reminders, editingReminder];
    } else {
      updated = reminders.map((r) =>
        r.id === editingReminder.id ? editingReminder : r
      );
    }
    updated.sort((a, b) => a.time.localeCompare(b.time));
    onSaveReminders(updated);
    setEditingReminder(null);
    setIsNew(false);
  };

  const handleStartNew = () => {
    setEditingReminder({
      id: 'rem_' + Date.now().toString(36),
      time: '09:00',
      title: 'Cab biyo',
      prompt: 'Cab galaas biyo ah si aad caafimaad iyo tamar u hesho.',
      enabled: true,
      soundEnabled: true,
      associatedTaskId: '',
    });
    setIsNew(true);
  };

  const handleTestReminder = async (rem: CustomReminder) => {
    setTestStatus('Ogeysiis ayaa loo dirayaa...');
    const ok = await triggerPushNotification(
      `🔔 ${rem.title}`,
      rem.prompt,
      rem.soundEnabled ?? true
    );
    if (ok) {
      setTestStatus('Ogeysiiska waa la diray! ✓ Hubi shaashaddaada.');
    } else {
      setTestStatus(
        'Ogolaanshaha ogeysiiska lama helin. Fadlan browser-ka ka ogolow ogeysiisyada.'
      );
    }
    setTimeout(() => setTestStatus(null), 4000);
  };

  const PRESETS = [
    { title: 'Cab biyo', prompt: 'Cab galaas biyo ah si aad u hesho firfircooni iyo biyo ku filan.', time: '09:00' },
    { title: 'Eeg iimaylka', prompt: 'Hubi fariimaha muhiimka ah oo nadiifi sanduuqaaga shaqada.', time: '11:00' },
    { title: 'Socod gaaban', prompt: 'Ka kac kursiga, 5 daqiiqo socod samee oo fidso.', time: '15:00' },
    { title: 'Diyaargarow Fajr', prompt: 'Waa xilligii toositaanka iyo u diyaar garowga salaadda Fajr.', time: '04:15' },
    { title: 'Koorso diirad', prompt: 'Waa xilligii casharka koorsada. Dami carqaladaha oo bilow.', time: '14:00' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#DCE8DF] border border-[#064E3B]/20 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#0F172A]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#064E3B]/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#064E3B] text-white flex items-center justify-center shadow-md">
              <Bell className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <h2 className="font-serif font-black text-base sm:text-lg text-[#0F172A]">
                Xusuusiyeyaasha Gaarka ah (Reminders)
              </h2>
              <p className="text-xs text-[#475569] font-medium">
                Deji waqtiyo gaar ah iyo ogeysiisyo toos ah (Push Notifications)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[#D0DFD4] text-[#475569] hover:text-[#0F172A] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Status message */}
          {testStatus && (
            <div className="p-3 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#064E3B] text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-[#10B981]" />
              <span>{testStatus}</span>
            </div>
          )}

          {/* Top action row */}
          {!editingReminder && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#475569]">
                Liiska Ogeysiisyada ({reminders.length})
              </span>
              <button
                onClick={handleStartNew}
                className="py-2 px-4 bg-[#064E3B] hover:bg-[#054030] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Ku dar Xusuusin</span>
              </button>
            </div>
          )}

          {/* Form when editing / adding */}
          {editingReminder ? (
            <form onSubmit={handleSaveForm} className="bg-[#E5EFE7] border border-[#064E3B]/15 rounded-2xl p-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#064E3B]">
                  {isNew ? '＋ Xusuusin Cusub' : '✎ Wax ka beddel Xusuusinta'}
                </span>
                <button
                  type="button"
                  onClick={() => setEditingReminder(null)}
                  className="text-xs text-[#475569] hover:text-[#0F172A] font-semibold"
                >
                  Jooji
                </button>
              </div>

              {/* Presets quick tags */}
              {isNew && (
                <div>
                  <label className="text-[11px] font-bold text-[#475569] block mb-1">Tusaalooyin degdeg ah:</label>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {PRESETS.map((p) => (
                      <button
                        key={p.title}
                        type="button"
                        onClick={() => {
                          setEditingReminder({
                            ...editingReminder,
                            title: p.title,
                            prompt: p.prompt,
                            time: p.time,
                          });
                        }}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-[#DCE8DF] hover:bg-[#D0DFD4] border border-[#064E3B]/15 font-semibold text-[#0F172A] transition"
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Time & Title */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-[#475569] block mb-1">Waqtiga</label>
                  <input
                    type="time"
                    required
                    value={editingReminder.time}
                    onChange={(e) =>
                      setEditingReminder({ ...editingReminder, time: e.target.value })
                    }
                    className="w-full bg-[#DCE8DF] border border-[#064E3B]/20 rounded-xl px-2.5 py-2 text-xs font-mono font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[11px] font-bold text-[#475569] block mb-1">Cinwaanka (Title)</label>
                  <input
                    type="text"
                    required
                    value={editingReminder.title}
                    onChange={(e) =>
                      setEditingReminder({ ...editingReminder, title: e.target.value })
                    }
                    placeholder="tusaale: Cab biyo, Eeg iimaylka..."
                    className="w-full bg-[#DCE8DF] border border-[#064E3B]/20 rounded-xl px-3 py-2 text-xs text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                  />
                </div>
              </div>

              {/* Prompt */}
              <div>
                <label className="text-[11px] font-bold text-[#475569] block mb-1">
                  Farriinta Xusuusinta (Prompt / Description)
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingReminder.prompt}
                  onChange={(e) =>
                    setEditingReminder({ ...editingReminder, prompt: e.target.value })
                  }
                  placeholder="Farriinta qoraalka ah ee ku soo bixi doonta ogeysiiska..."
                  className="w-full bg-[#DCE8DF] border border-[#064E3B]/20 rounded-xl p-2.5 text-xs text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#10B981] resize-none"
                />
              </div>

              {/* Associate with task */}
              <div>
                <label className="text-[11px] font-bold text-[#475569] block mb-1">
                  Ku xidh Hawl ka mid ah Jadwalka (Ikhtiyaari)
                </label>
                <select
                  value={editingReminder.associatedTaskId || ''}
                  onChange={(e) =>
                    setEditingReminder({
                      ...editingReminder,
                      associatedTaskId: e.target.value,
                    })
                  }
                  className="w-full bg-[#DCE8DF] border border-[#064E3B]/20 rounded-xl px-2.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                >
                  <option value="">
                    Ogeysiis Guud (General Prompt)
                  </option>
                  {plan.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.em} {p.title} ({formatTimeDisplay(p.t, is12h)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Sound alert option */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0F172A]">
                  <input
                    type="checkbox"
                    checked={editingReminder.soundEnabled ?? true}
                    onChange={(e) =>
                      setEditingReminder({
                        ...editingReminder,
                        soundEnabled: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-[#10B981] accent-[#10B981]"
                  />
                  <span>Dhawaaq / Chime marka uu dhaco</span>
                </label>
              </div>

              {/* Form buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-[#064E3B]/15">
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="py-2 px-5 bg-[#064E3B] hover:bg-[#054030] text-white font-bold text-xs rounded-xl shadow active:scale-95 transition"
                  >
                    Kaydi Xusuusinta
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingReminder(null)}
                    className="py-2 px-3 bg-[#DCE8DF] hover:bg-[#D0DFD4] text-xs font-semibold text-[#0F172A] rounded-xl transition"
                  >
                    Jooji
                  </button>
                </div>
                {!isNew && (
                  <button
                    type="button"
                    onClick={() => handleDeleteReminder(editingReminder.id)}
                    className="p-2 text-rose-700 hover:bg-rose-500/20 rounded-xl transition"
                    title="Tirtir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          ) : (
            /* Reminders list */
            <div className="space-y-2.5">
              {reminders.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#475569]">
                  Weli ma jiraan xusuusiyeyaal gaar ah. Taabo "Ku dar Xusuusin" kor.
                </div>
              ) : (
                reminders.map((r) => {
                  const linkedTask = plan.find((p) => p.id === r.associatedTaskId);

                  return (
                    <div
                      key={r.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        r.enabled ? 'border-[#064E3B]/15 bg-[#E5EFE7]' : 'border-[#064E3B]/10 bg-[#E5EFE7]/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        {/* Time & Title */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-bold text-sm text-[#064E3B] bg-[#10B981]/20 px-2 py-0.5 rounded-lg">
                              {formatTimeDisplay(r.time, is12h)}
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-[#0F172A] truncate">
                              {r.title}
                            </span>
                            {linkedTask && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#064E3B] font-bold border border-[#10B981]/30">
                                {linkedTask.em} {linkedTask.title}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#475569] mt-1.5 leading-relaxed line-clamp-2 font-medium">
                            {r.prompt}
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {/* Enable toggle switch */}
                          <button
                            type="button"
                            onClick={() => handleToggleReminder(r.id)}
                            className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                              r.enabled ? 'bg-[#10B981] justify-end' : 'bg-[#CBD5E1] justify-start'
                            }`}
                            aria-label={r.enabled ? 'Dami' : 'Shid'}
                          >
                            <span className="w-5 h-5 rounded-full bg-white shadow-md block" />
                          </button>
                        </div>
                      </div>

                      {/* Bottom actions */}
                      <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-[#064E3B]/10 text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleTestReminder(r)}
                            className="text-[11px] text-[#064E3B] hover:text-[#10B981] font-bold flex items-center gap-1"
                          >
                            <Bell className="w-3 h-3 text-[#10B981]" />
                            <span>Tijaabi Ogeysiiska</span>
                          </button>
                          <span className="text-[#64748B]">•</span>
                          <span className="text-[10px] text-[#475569] font-medium flex items-center gap-1">
                            {r.soundEnabled ? <Volume2 className="w-3 h-3 text-[#10B981]" /> : <VolumeX className="w-3 h-3 text-[#64748B]" />}
                            <span>{r.soundEnabled ? 'Dhawaaq leh' : 'Aamusan'}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingReminder(r);
                              setIsNew(false);
                            }}
                            className="p-1 hover:bg-[#D0DFD4] rounded-lg text-[#064E3B] transition"
                            title="Wax ka beddel"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteReminder(r.id)}
                            className="p-1 hover:bg-rose-500/20 rounded-lg text-rose-700 transition"
                            title="Tirtir"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#D0DFD4] border-t border-[#064E3B]/15 flex items-center justify-between text-xs text-[#475569]">
          <span className="font-medium">Ogeysiisyada waxay shaqeeyaan marka nidaamku furan yahay.</span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 bg-[#064E3B] hover:bg-[#054030] rounded-xl font-bold text-white transition active:scale-95 shadow-sm"
          >
            Xir
          </button>
        </div>
      </div>
    </div>
  );
};
