export const Overlay = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between z-10 font-sans p-6 md:p-12">
            {/* Header */}
            <div className="flex flex-col items-start animate-fade-in-down">
                {/* Using border-b for a subtle line */}
                <h1 className="text-white/90 text-sm tracking-[0.3em] font-light uppercase border-b border-white/20 pb-2 mb-2">
                    The Memories
                </h1>
            </div>

            {/* Center instruction */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/30 text-xs tracking-widest uppercase animate-pulse">
                Scroll / Swipe
            </div>

            {/* Footer */}
            <div className="flex flex-col items-end self-end text-right animate-fade-in-up">
                <h2 className="text-4xl md:text-6xl font-serif text-white drop-shadow-xl italic">
                    Celebrating You
                </h2>
                <p className="text-white/70 mt-2 font-light max-w-xs text-sm md:text-base">
                    A journey through the moments that make you special.
                </p>
            </div>
        </div>
    );
};
