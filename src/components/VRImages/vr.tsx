import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import VR_image from "../../assest/vrimage/livingroom.jpg";
import "./vr.css";

function VRImage() {
  const orbitControlConfig = {
    enableZoom: true, // Enable zoom
    minDistance: 1, // Minimum zoom distance
    maxDistance: 10, // Maximum zoom distance
    zoomSpeed: 0.5, // Adjust zoom speed
    enableDamping: true, // Enable damping for smooth transitions
    dampingFactor: 0.1, // Adjust the damping effect
  };

  return (
    <Canvas>
      <OrbitControls {...orbitControlConfig} makeDefault /> {/* OrbitControls configuration */}
      <Environment files={VR_image} background /> {/* 360° VR Image */}
    </Canvas>
  );
}

function App() {
  const rooms = ["Bed", "Bath", "Living", "Dining", "Kitchen"];

  return (
    <div className="vr-property">
      <div className="btn-property">
        {rooms.map((room, index) => (
          <button key={index}>{room}</button>
        ))}
      </div>
      <VRImage />
    </div>
  );
}

export default App;
