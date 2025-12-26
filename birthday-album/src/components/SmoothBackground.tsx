import { Image, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { slides } from "../store";

export const SmoothBackground = () => {
    const scroll = useScroll();
    const { width, height } = useThree((state) => state.viewport);
    const group = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!group.current) return;

        // Calculate continuous index
        const total = slides.length;
        const currentScrollIndex = scroll.offset * (total - 1);

        group.current.children.forEach((child, childIndex) => {
            // Ensure this child has a material we can safely manipulate
            const mesh = child as THREE.Object3D & { material?: any };
            const mat = mesh.material;
            if (!mat) {
                // nothing to do for non-material children
                return;
            }

            // Determine target opacity for this layer
            let targetOpacity = 1;
            if (childIndex === 0) {
                targetOpacity = 1;
            } else {
                const fade = currentScrollIndex - (childIndex - 1);
                targetOpacity = Math.max(0, Math.min(1, fade));
            }

            // Some materials may be an array (multi-material) or may not expose 'opacity'
            if (Array.isArray(mat)) {
                mat.forEach((m) => { if ('opacity' in m) m.opacity = targetOpacity; });
            } else if ('opacity' in mat) {
                mat.opacity = targetOpacity;
            }

            // Show/hide based on opacity if available
            if ('opacity' in mat) {
                mesh.visible = mat.opacity > 0;
            }
        });
    });

    return (
        <group ref={group}>
            {slides.map((slide, i) => (
                slide.image ? (
                    <Image
                        key={i}
                        url={slide.image}
                        scale={[width, height]}
                        position={[0, 0, -5 - (i * 0.01)]}
                        transparent
                        opacity={i === 0 ? 1 : 0}
                    />
                ) : (
                    <mesh key={i} position={[0, 0, -5 - (i * 0.01)]}>
                        <planeGeometry args={[width, height]} />
                        <meshBasicMaterial color="#0b0b0b" transparent opacity={i === 0 ? 1 : 0} />
                    </mesh>
                )
            ))}
        </group>
    );
};
