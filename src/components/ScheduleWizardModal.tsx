import React, { useState } from 'react';
import { X, Plus, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { RoutineItem, CategoryType } from '../types/index.ts';
import { playChime } from '../utils/soundEffects.ts';

interface ScheduleWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySchedule: (newPlan: RoutineItem[]) => void;
  currentPlanLength: number;
}

export const ScheduleWizardModal: React.FC<ScheduleWizardModalProps> = ({
  isOpen,
  onClose,
  onApplySchedule,
}) => {
  const [items, setItems] = useState<RoutineItem[]>([]);

  // Custom task form state
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('08:00');
  const [newEmoji, setNewEmoji] = useState('📌');
  const [newCat, setNewCat] = useState<CategoryType>('tac');

  if (!isOpen) return null;

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    playChime('tap');
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: RoutineItem = {
      id: `p_${Date.now()}`,
      t: newTime,
      title: newTitle.trim(),
      note: '',
      cat: newCat,
      em: newEmoji,
    };

    setItems((prev) => [...prev, newItem].sort((a, b) => a.t.localeCompare(b.t)));
    setNewTitle('');
    playChime('success');
  };

  const handleApply = () => {
    playChime('success');
    onApplySchedule(items);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#DCE8DF] border border-[#064E3B]/20 rounded-3xl p-5 sm:p-6 shadow-2xl max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#064E3B]/15">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#064E3B] text-white flex items-center justify-center text-lg shadow-sm">
              ✨
            </div>
            <div>
              <h3 className="font-serif font-black text-lg text-[#0F172A] leading-tight">
                Dhis Jadwalkaaga Maalinlaha ah
              </h3>
              <p className="text-xs text-[#475569] font-medium">
                Adigu si toos ah u qor hawlaha aad doonayso maanta
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#D0DFD4] text-[#475569] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Custom Task Form */}
        <form onSubmit={handleAddItem} className="p-4 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/15 space-y-3">
          <label className="text-xs font-bold text-[#064E3B] flex items-center gap-1.5 uppercase tracking-wider">
            <Plus className="w-4 h-4 text-[#10B981]" />
            <span>Ku dar Hawl Cusub:</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Qor magaca hawsha (tusaale: Salaadda Fajr, Quraan, Shaqo)..."
              className="sm:col-span-6 px-3.5 py-2.5 rounded-xl bg-[#DCE8DF] border border-[#064E3B]/20 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#10B981]"
            />
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="sm:col-span-3 px-2.5 py-2.5 rounded-xl bg-[#DCE8DF] border border-[#064E3B]/20 text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-[#10B981]"
            />
            <select
              value={newEmoji}
              onChange={(e) => setNewEmoji(e.target.value)}
              className="sm:col-span-3 px-2 py-2.5 rounded-xl bg-[#DCE8DF] border border-[#064E3B]/20 text-xs font-bold"
            >
              <option value="🕌">🕌 Salaad</option>
              <option value="📖">📖 Quraan</option>
              <option value="💻">💻 Shaqo</option>
              <option value="📚">📚 Akhris</option>
              <option value="📿">📿 Tasbiix</option>
              <option value="🥗">🥗 Cunto</option>
              <option value="😴">😴 Hurdo</option>
              <option value="📌">📌 Hawl</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold hover:bg-[#047857] transition flex items-center justify-center gap-1.5 shadow-md shadow-[#064E3B]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Ku Dar Liiska Hawlaha</span>
          </button>
        </form>

        {/* Current Tasks List with Delete Buttons */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#064E3B]">
              Hawlaha Hadda Diyaarka ah ({items.length} hawlood):
            </span>
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => setItems([])}
                className="text-[11px] font-bold text-rose-600 hover:underline"
              >
                Tirtir Dhammaan
              </button>
            )}
          </div>

          <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
            {items.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#E5EFE7] border border-dashed border-[#064E3B]/20 text-center text-xs text-[#475569] space-y-1">
                <p className="font-semibold text-[#0F172A]">Weli wax hawlo ah kuma jiraan.</p>
                <p className="text-[11px]">Adigu xor ayaad u tahay inaad qorto hawlaha maanta aad doonayso.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/10 text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-lg">{item.em}</span>
                    <span className="font-semibold text-[#0F172A] truncate">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono font-bold text-[#064E3B] text-[11px] bg-[#DCE8DF] px-2.5 py-0.5 rounded-lg border border-[#064E3B]/10">
                      {item.t}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-500 transition"
                      title="Tirtir hawshan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#064E3B]/15">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#0F172A] text-xs font-bold transition"
          >
            Ka Noqo
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#10B981] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#064E3B]/20 hover:brightness-105 active:scale-95 transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Dabbaq Jadwalka ({items.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
