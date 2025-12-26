import { ScrollControls, Scroll, Image as DreiImage, useScroll } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import confetti from "canvas-confetti";
import { useStore, slides } from "../store";
import { SmoothBackground } from "./SmoothBackground";

export const Album = () => {
    const { width, height } = useThree((state) => state.viewport);

    return (
        <ScrollControls pages={slides.length} damping={4} horizontal={false} infinite={false} snap>
            <SmoothBackground />
            <AlbumContent width={width} height={height} />
        </ScrollControls>
    );
};

const AlbumContent = ({ width, height }: { width: number, height: number }) => {
    const scroll = useScroll();
    const setSlide = useStore((state) => state.setSlide);

    useFrame(() => {
        // Sync active slide index
        // We want a snappy feel, but continuous scroll is okay too.
        const index = Math.round(scroll.offset * (slides.length - 1));
        setSlide(index);

        // Confetti on last slide
        if (scroll.offset > 0.95 && Math.random() > 0.98) {
            confetti({
                particleCount: 50,
                spread: 50,
                origin: { y: 0.6 }
            });
        }
    });

    return (
        <Scroll>
            {slides.map((slide, i) => (
                <StackedSlide
                    key={i}
                    data={slide}
                    index={i}
                    total={slides.length}
                    width={width}
                    height={height}
                />
            ))}
        </Scroll>
    );
};

interface SlideProps {
    data: any;
    index: number;
    total: number;
    width: number;
    height: number;
}

const StackedSlide = ({ data, index, total, width, height }: SlideProps) => {
    const group = useRef<THREE.Group>(null);
    const scroll = useScroll();

    // Responsive Card Dimensions
    // Mobile (width < 5): Width is 85% of screen
    // Desktop: Width is fixed smaller value
    const isMobile = width < 5;
    const cardWidth = isMobile ? width * 0.8 : 3.5;
    const cardHeight = cardWidth * 1.4;

    useFrame(() => {
        if (!group.current) return;

        // Exact scroll index (can be fractional): 0..total-1
        const exact = scroll.offset * (total - 1);

        // delta = index - exact (can be fractional). When delta -> 0, the card is active.
        const delta = index - exact;
        const absDelta = Math.abs(delta);

        // t: proximity to active (1 when active exactly, 0 when one index away or more)
        const t = Math.max(0, 1 - absDelta);
        const ease = 1 - Math.pow(1 - t, 2); // easeOut quad

        // Stacking and motion parameters
        const basePeek = cardHeight * 0.15;
        const baseZGap = 2.0;

        // Target base positions depending on whether card is ahead (below) or passed
        const baseY = delta > 0 ? -delta * (basePeek + 0.1) : -delta * (height * 0.6);
        const baseZ = delta > 0 ? -delta * baseZGap : 0;
        const baseScale = delta > 0 ? Math.max(0.75, 1 - absDelta * 0.05) : 1;

        // Interpolate towards centered active state using ease
        const y = THREE.MathUtils.lerp(baseY, 0, ease);
        const z = THREE.MathUtils.lerp(baseZ, 0, ease);
        const scale = THREE.MathUtils.lerp(baseScale, 1.15, ease); // zoom a bit when active

        group.current.position.set(0, y, z);
        group.current.scale.setScalar(scale);
    });

    return (
        <group ref={group}>
            {/* Visual Card */}
            {data.image && (
                <DreiImage
                    url={data.image}
                    scale={[cardWidth, cardHeight]}
                    transparent
                    radius={0.15}
                // box-shadow feel?
                />
            )}
        </group>
    );
};
