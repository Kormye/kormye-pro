/**
 * Global Audio Manager Singleton
 * Guarantees ONLY ONE audio element exists and plays at any time.
 * Prevents overlapping recitations or multiple voices.
 * Ensures instant, reliable start and stop controls.
 */

type AudioStateListener = (playingSurahId: number | null, isPlaying: boolean) => void;

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private currentSurahId: number | null = null;
  private isAudioPlaying: boolean = false;
  private listeners: Set<AudioStateListener> = new Set();
  private playToken: number = 0;

  private getAudio(): HTMLAudioElement {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.isAudioPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('playing', () => {
        this.isAudioPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isAudioPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.isAudioPlaying = false;
        this.currentSurahId = null;
        this.notify();
      });

      this.audio.addEventListener('error', () => {
        this.isAudioPlaying = false;
        this.currentSurahId = null;
        this.notify();
      });
    }
    return this.audio;
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener(this.currentSurahId, this.isAudioPlaying);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l(this.currentSurahId, this.isAudioPlaying));
  }

  public isPlaying(): boolean {
    return this.isAudioPlaying;
  }

  public isSurahPlaying(surahId: number): boolean {
    return this.isAudioPlaying && this.currentSurahId === surahId;
  }

  public getCurrentSurahId(): number | null {
    return this.currentSurahId;
  }

  public stopAll() {
    this.playToken++;
    this.isAudioPlaying = false;
    this.currentSurahId = null;
    this.notify();

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }

    if (this.audio) {
      try {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.removeAttribute('src');
      } catch {}
    }
  }

  public async playSurah(
    surahId: number,
    audioUrl: string,
    onEnded?: () => void,
    onError?: (err: any) => void
  ): Promise<void> {
    const token = ++this.playToken;

    // Cancel speech synthesis
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }

    const a = this.getAudio();

    // Reset previous audio
    try {
      a.pause();
      a.currentTime = 0;
    } catch {}

    a.src = audioUrl;
    this.currentSurahId = surahId;
    this.isAudioPlaying = true;
    this.notify();

    a.onended = () => {
      if (this.playToken === token) {
        this.isAudioPlaying = false;
        this.currentSurahId = null;
        this.notify();
        if (onEnded) onEnded();
      }
    };

    a.onerror = (e) => {
      if (this.playToken === token) {
        this.isAudioPlaying = false;
        this.currentSurahId = null;
        this.notify();
        if (onError) onError(e);
      }
    };

    try {
      await a.play();
      if (this.playToken !== token) {
        // Was stopped while loading
        try {
          a.pause();
        } catch {}
      }
    } catch (err: any) {
      // AbortError is normal when stopped quickly by user
      if (this.playToken === token && err?.name !== 'AbortError') {
        this.isAudioPlaying = false;
        this.currentSurahId = null;
        this.notify();
        if (onError) onError(err);
      }
    }
  }

  public toggleSurah(
    surahId: number,
    audioUrl: string,
    onEnded?: () => void,
    onError?: (err: any) => void
  ) {
    if (this.isSurahPlaying(surahId)) {
      this.stopAll();
    } else {
      this.playSurah(surahId, audioUrl, onEnded, onError);
    }
  }
}

export const globalAudioManager = new AudioManager();
