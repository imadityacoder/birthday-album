import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { BackgroundMusic } from "./components/BackgroundMusic";

function App() {
  return (
    <div className="w-full h-screen relative bg-gradient-to-b from-gray-900 to-black">
      <Overlay />
      <BackgroundMusic />
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
        <Experience />
      </Canvas>
    </div>
  );
}

export default App;
