import { useState, useRef, useEffect } from "react";

export const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((e) => console.error("Playback failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        // Attempt auto-play on mount (often blocked by browsers, but worth a shot for "reload")
        const playPromise = audioRef.current?.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false)); // Auto-play blocked
        }
    }, []);

    return (
        <div className="absolute bottom-5 right-5 z-20">
            <audio ref={audioRef} loop>
                <source src="https://cdn.pixabay.com/download/audio/2022/10/05/audio_68629b3a32.mp3?filename=uplifting-cinematic-ambient-118831.mp3" type="audio/mpeg" />
            </audio>

            <button
                onClick={togglePlay}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all cursor-pointer"
                aria-label={isPlaying ? "Mute Music" : "Play Music"}
            >
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.12l.712-.712 2.122 2.122-.712.712A2.246 2.246 0 0021 12c0 .618-.246 1.21-.685 1.644l-2.121 2.121-.712-.712m-2.122-8.312l-4.242 4.242a2.31 2.31 0 00-.685 1.645c0 .618.246 1.21.685 1.644l4.242 4.242" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 12l2-2m-2 2l2 2" />
                    </svg>
                )}
            </button>
        </div>
    );
};
