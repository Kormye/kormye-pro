/**
 * Web Audio API synthesizer for ambient reading sounds and tactile audio cues.
 * Completely client-side, zero external asset dependencies, works offline.
 */

let audioCtx: AudioContext | null = null;
let activeAmbientSource: { stop: () => void } | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle pleasant chime when completing a task or milestone
export function playChime(type: 'success' | 'click' | 'bell' | 'tap' = 'click') {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.35); // C6
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.start(now);
      osc.stop(now + 0.85);
    } else if (type === 'bell') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc.start(now);
      osc.stop(now + 1.25);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(type === 'tap' ? 360 : 440, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.09);
    }
  } catch {
    // Audio context may be blocked before user gesture
  }
}

// Synthesize soothing ambient reading sounds: Rain, Waves, Forest/Breeze
export function startAmbientSound(soundType: 'rain' | 'waves' | 'breeze' | 'none') {
  stopAmbientSound();
  if (soundType === 'none') return;

  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();

    if (soundType === 'rain') {
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      gainNode.gain.value = 0.06;
    } else if (soundType === 'waves') {
      filter.type = 'bandpass';
      filter.frequency.value = 400;
      filter.Q.value = 1.2;
      gainNode.gain.value = 0.08;

      // Modulate waves
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.15; // slow surge
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 250;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
    } else if (soundType === 'breeze') {
      filter.type = 'lowpass';
      filter.frequency.value = 350;
      gainNode.gain.value = 0.05;
    }

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    whiteNoise.start();

    activeAmbientSource = {
      stop: () => {
        try {
          whiteNoise.stop();
          whiteNoise.disconnect();
        } catch {}
      },
    };
  } catch {
    // ignore
  }
}

export function stopAmbientSound() {
  if (activeAmbientSource) {
    activeAmbientSource.stop();
  }
  activeAmbientSource = null;
}

/**
 * Clean, deep resonant voice for authentic Somali speech articulation
 * Cleans text of emojis, symbols, and formatting, applies deep pitch (0.84)
 * and measured pacing (0.90) with male/baritone prioritization.
 */
export function cleanSomaliText(raw: string): string {
  return raw
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '') // remove emojis
    .replace(/[#*_~`>[\]()]/g, '') // remove markdown symbols
    .replace(/\s+/g, ' ')
    .trim();
}

export function speakText(
  text: string,
  rateOrOnEnd: number | (() => void) = 0.92,
  onEnd?: () => void,
  onError?: () => void
): { stop: () => void; pause: () => void; resume: () => void } {
  const actualRate = typeof rateOrOnEnd === 'number' ? rateOrOnEnd : 0.92;
  const actualOnEnd = typeof rateOrOnEnd === 'function' ? rateOrOnEnd : onEnd;

  if (!('speechSynthesis' in window)) {
    return { stop: () => {}, pause: () => {}, resume: () => {} };
  }

  window.speechSynthesis.cancel();
  const cleanedText = cleanSomaliText(text);
  if (!cleanedText) {
    if (actualOnEnd) actualOnEnd();
    return { stop: () => {}, pause: () => {}, resume: () => {} };
  }

  const utterance = new SpeechSynthesisUtterance(cleanedText);
  // DEEP VOICE TUNING: Pitch 0.84 gives a deep, calm, authoritative baritone voice
  utterance.pitch = 0.84;
  utterance.rate = actualRate;

  // Search voices for best deep resonant voice
  const voices = window.speechSynthesis.getVoices();

  // 1. Exact Somali voice if installed
  const somaliVoice = voices.find((v) => v.lang.startsWith('so'));
  // 2. Arabic voice (shares Arabic/Somali phonetics: x, c, kh, q, sh)
  const arabicVoice = voices.find((v) => v.lang.startsWith('ar'));
  // 3. Deep male baritone voice (UK Male, US Male, Daniel, David, Guy, etc.)
  const deepMaleVoice = voices.find(
    (v) =>
      /male|deep|baritone|daniel|david|guy|ryan|george|arthur|oliver|thomas/i.test(v.name) ||
      (v.name.includes('Google') && /male/i.test(v.name))
  );

  if (somaliVoice) {
    utterance.voice = somaliVoice;
  } else if (arabicVoice) {
    utterance.voice = arabicVoice;
  } else if (deepMaleVoice) {
    utterance.voice = deepMaleVoice;
  }

  if (actualOnEnd) utterance.onend = actualOnEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);

  return {
    stop: () => window.speechSynthesis.cancel(),
    pause: () => window.speechSynthesis.pause(),
    resume: () => window.speechSynthesis.resume(),
  };
}
