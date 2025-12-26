import { Environment, Sparkles, Stars, Float } from "@react-three/drei";
import { Album } from "./Album";

export const Experience = () => {
    return (
        <>
            {/* Lighting for depth */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[0, 10, 5]} intensity={1.5} color="#ffdebc" />
            <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={2} color="#f0bbd8" />

            {/* Atmosphere */}
            <Environment preset="night" blur={0.5} />
            <Sparkles count={50} scale={10} size={5} speed={0.4} opacity={0.6} color="#fff" />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

            <group position-y={0}>
                <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
                    <Album />
                </Float>
            </group>
        </>
    );
};
