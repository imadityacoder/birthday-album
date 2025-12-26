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
        <ScrollControls pages={slides.length} damping={0.2} horizontal={false} infinite={false}>
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

        const currentScrollIndex = scroll.offset * (total - 1);
        const delta = index - currentScrollIndex;

        // STACKING LOGIC REFINED

        // Base gap between stacked cards at the bottom
        // const stackedGap = isMobile ? 0.3 : 0.5;

        if (delta >= 0) {
            // Cards coming up from the bottom (or current)

            // Y Position:
            // If delta is 0 (Active), y = 0.
            // If delta is 1 (Next), y should be lower. 
            // We want a "bunching" effect.
            // y = -delta * gap is linear.
            // y = -Math.pow(delta, 0.5) * gap pulls them closer?

            // Let's do linear but tight, so they peek.
            group.current.position.y = -delta * (cardHeight * 0.15) - (Math.max(0, delta) * 0.1);

            // Z Position: Push back
            group.current.position.z = -delta * 1.5;

            // Scale: Shrink slightly
            const scale = Math.max(0.8, 1 - delta * 0.05);
            group.current.scale.setScalar(scale);

            // Opacity/Fade?
            // Drei Image transparent prop allows opacity control but we need ref access to material.
            // Simplified: They just stack.

        } else {
            // Cards that have passed (scroll up and away)
            // They fly up.
            // delta is negative. -delta is positive amount passed.

            // We want them to move UP faster than normal scroll to clear view.
            group.current.position.y = -delta * (height * 0.6); // Move up

            // Z Position: Slight push back or bring forward?
            // If we bring forward, they block. Push back slightly or keep at 0.
            // Let's keep at 0.
            group.current.position.z = 0;

            // Scale
            group.current.scale.setScalar(1);
        }
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
