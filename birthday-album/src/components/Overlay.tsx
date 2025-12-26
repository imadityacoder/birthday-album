import { useStore, slides } from "../store";

export const Overlay = () => {
    const activeSlide = useStore((state) => state.activeSlide);
    const slide = slides[activeSlide];

    // We removed the background image div from here because 
    // it is now handled by the SmoothBackground 3D component.

    return (
        <>
            {/* Content Container - Bottom aligned for mobile */}
            <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-end pb-24 px-6 pointer-events-none">
                <div className="animate-fade-in-up transition-all duration-300 pointer-events-auto">
                    <div className="text-white/70 tracking-[0.2em] text-xs uppercase mb-2">
                        Memory {activeSlide + 1}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 drop-shadow-lg">
                        {slide.title}
                    </h1>
                    <p className="text-base md:text-lg text-white/90 font-light leading-relaxed mb-6 max-w-lg drop-shadow-md">
                        "{slide.caption}"
                    </p>

                    <button className="px-6 py-2 border border-white/40 rounded-full text-white text-sm backdrop-blur-md hover:bg-white hover:text-black transition-all">
                        Read More
                    </button>
                </div>
            </div>

            {/* Vertical Progress Indicators (Right side) */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-3">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeSlide ? "bg-white h-4" : "bg-white/40"}`}
                    />
                ))}
            </div>
        </>
    );
};
