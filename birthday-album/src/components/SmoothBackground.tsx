import { useThree } from "@react-three/fiber";

// SmoothBackground now intentionally does not render slide images.
// Background imagery has been removed in favor of the app-level CSS/background.
export const SmoothBackground = () => {
    // Keep a minimal 3D element to preserve scene spacing if needed
    const { width, height } = useThree((state) => state.viewport);

    return (
        // Render a subtle dark plane as a backdrop so the 3D scene has a stable background
        <group>
            <mesh position={[0, 0, -10]}>
                <planeGeometry args={[Math.max(width, 10), Math.max(height, 10)]} />
                <meshBasicMaterial color="#050406" toneMapped={false} />
            </mesh>
        </group>
    );
};
