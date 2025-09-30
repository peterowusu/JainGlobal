import { useCallback, useRef } from "react";

export function useSound() {
  const audioContext = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playClickSound = useCallback(() => {
    initAudio();
    if (!audioContext.current) return;

    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.current.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.1);
    
    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + 0.1);
  }, [initAudio]);

  const playHoverSound = useCallback(() => {
    initAudio();
    if (!audioContext.current) return;

    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.frequency.setValueAtTime(600, audioContext.current.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.05);
    
    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + 0.05);
  }, [initAudio]);

  const playSuccessSound = useCallback(() => {
    initAudio();
    if (!audioContext.current) return;

    const frequencies = [523, 659, 784]; // C, E, G
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.current!.createOscillator();
      const gainNode = audioContext.current!.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.current!.destination);
      
      oscillator.frequency.setValueAtTime(freq, audioContext.current!.currentTime + index * 0.1);
      gainNode.gain.setValueAtTime(0.1, audioContext.current!.currentTime + index * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current!.currentTime + index * 0.1 + 0.3);
      
      oscillator.start(audioContext.current!.currentTime + index * 0.1);
      oscillator.stop(audioContext.current!.currentTime + index * 0.1 + 0.3);
    });
  }, [initAudio]);

  return {
    playClickSound,
    playHoverSound,
    playSuccessSound,
  };
}
