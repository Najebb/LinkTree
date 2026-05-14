'use client';

// ============================================================
// FANTASY REALM — AUDIO CONTEXT
// Sistem audio ambient opsional
// PENTING: Tidak autoplay — user harus enable secara eksplisit
// ============================================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';

import { AUDIO_TRACKS } from '@/config/site';
import type { AudioState, AudioTrackId } from '@/types';

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

interface AudioContextValue {
  state:       AudioState;
  enable:      () => void;                      // User aktifkan audio
  disable:     () => void;                      // User matikan audio
  toggle:      () => void;                      // Toggle on/off
  setVolume:   (v: number) => void;             // 0.0 - 1.0
  playTrack:   (id: AudioTrackId) => void;      // Mainkan track ambient
  stopTrack:   () => void;                      // Stop track aktif
  playSFX:     (id: AudioTrackId) => void;      // Mainkan sound effect
}

// ─────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────

const AudioCtx = createContext<AudioContextValue | null>(null);

const STORAGE_KEY = 'fantasy-realm-audio';
const DEFAULT_STATE: AudioState = {
  enabled:      false,    // Default OFF — user harus aktifkan
  volume:       0.3,
  currentTrack: null,
  isPlaying:    false,
};

// ─────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AudioState>(DEFAULT_STATE);

  // Map audio element per track
  const audioRefs = useRef<Map<AudioTrackId, HTMLAudioElement>>(new Map());
  const sfxRefs   = useRef<Map<AudioTrackId, HTMLAudioElement>>(new Map());

  // Load preferensi dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<AudioState>;
        setState(prev => ({
          ...prev,
          enabled: parsed.enabled ?? false,
          volume:  parsed.volume  ?? 0.3,
        }));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Persist preferensi
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      enabled: state.enabled,
      volume:  state.volume,
    }));
  }, [state.enabled, state.volume]);

  // Buat / update audio elements
  const getAudioEl = useCallback((id: AudioTrackId, isSFX = false): HTMLAudioElement | null => {
    if (typeof window === 'undefined') return null;

    const map = isSFX ? sfxRefs.current : audioRefs.current;
    if (map.has(id)) return map.get(id)!;

    const track = AUDIO_TRACKS.find(t => t.id === id);
    if (!track) return null;

    const audio = new Audio(track.src);
    audio.loop   = track.loop;
    audio.volume = track.volume;
    map.set(id, audio);
    return audio;
  }, []);

  const enable = useCallback(() => {
    setState(prev => ({ ...prev, enabled: true }));
  }, []);

  const disable = useCallback(() => {
    // Stop semua audio yang sedang berjalan
    audioRefs.current.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    setState(prev => ({
      ...prev,
      enabled:      false,
      isPlaying:    false,
      currentTrack: null,
    }));
  }, []);

  const toggle = useCallback(() => {
    setState(prev => {
      if (prev.enabled) {
        audioRefs.current.forEach(a => a.pause());
        return { ...prev, enabled: false, isPlaying: false };
      }
      return { ...prev, enabled: true };
    });
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clamped = Math.max(0, Math.min(1, volume));
    audioRefs.current.forEach(audio => { audio.volume = clamped; });
    setState(prev => ({ ...prev, volume: clamped }));
  }, []);

  const playTrack = useCallback((id: AudioTrackId) => {
    if (!state.enabled) return;

    // Stop track sebelumnya
    if (state.currentTrack && state.currentTrack !== id) {
      const prev = audioRefs.current.get(state.currentTrack);
      if (prev) { prev.pause(); prev.currentTime = 0; }
    }

    const audio = getAudioEl(id);
    if (!audio) return;

    audio.volume = state.volume;
    audio.play().catch(() => {
      // Browser block autoplay — tidak apa-apa, user belum interaksi
    });

    setState(prev => ({
      ...prev,
      currentTrack: id,
      isPlaying:    true,
    }));
  }, [state.enabled, state.currentTrack, state.volume, getAudioEl]);

  const stopTrack = useCallback(() => {
    if (state.currentTrack) {
      const audio = audioRefs.current.get(state.currentTrack);
      if (audio) { audio.pause(); audio.currentTime = 0; }
    }
    setState(prev => ({ ...prev, currentTrack: null, isPlaying: false }));
  }, [state.currentTrack]);

  const playSFX = useCallback((id: AudioTrackId) => {
    if (!state.enabled) return;

    const audio = getAudioEl(id, true);
    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = state.volume * 0.8;
    audio.play().catch(() => {});
  }, [state.enabled, state.volume, getAudioEl]);

  const value = useMemo<AudioContextValue>(() => ({
    state, enable, disable, toggle, setVolume, playTrack, stopTrack, playSFX,
  }), [state, enable, disable, toggle, setVolume, playTrack, stopTrack, playSFX]);

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

// ─────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────

export function useAudioContext(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudioContext harus di dalam <AudioProvider>');
  return ctx;
}
