import { Canvas, useFrame } from "@react-three/fiber"
import { Butterfly } from "./Butterfly"
import { Environment, Lightformer, OrbitControls, Float, ContactShadows, Text3D, Center, } from "@react-three/drei"
import * as THREE from 'three'
import { LayerMaterial, Base, Depth, Noise } from 'lamina'
import { useRef } from "react"


function Striplight(props) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

function Butterflies() {


  useFrame((state, delta) => {
  });

  return(
    <>
        {Array(40).fill().map(() => <Butterfly scale={0.02} animate={true} position={[Math.random()* 10, Math.random()* 10, Math.random()* -5]} />)}
    </>
  );
}

function App() {

  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, window.innerWidth < 700 ? 7 : 5] }} style={{position: 'absolute', width: '100%', height: '100dvh'}}>
        <OrbitControls minPolarAngle={Math.PI / 1.8} maxPolarAngle={Math.PI / 1.8} />
        <pointLight position={[10, 10, 5]} />
        <pointLight position={[-10, -10, -5]} />
        <ambientLight intensity={0.4} />
        <Butterflies />
        <group position={[0, -1.5, 0]}>
          <Float 
            position={[0, 2.15, 0]} 
            speed={2} 
            rotationIntensity={2} 
            floatIntensity={2}
          >
            <Center>
              <Text3D scale={1} font={'./Charm_Bold.json'} castShadow receiveShadow>
                Naliyah
                <meshStandardMaterial color="white" roughness={0.1} metalness={0.925} />
              </Text3D>
            </Center>
          </Float>
          {/* <ContactShadows scale={10} blur={3} opacity={0.25} far={10} /> */}
        </group>


        <Environment background resolution={64}>
          {/* <Striplight position={[10, 2, 0]} scale={[1, 3, 10]} />
          <Striplight position={[-10, 2, 0]} scale={[1, 3, 10]} /> */}
          <mesh scale={100}>
            <sphereGeometry args={[1, 64, 64]} />
            <LayerMaterial side={THREE.BackSide}>
              <Base color="blue" alpha={1} mode="normal" />
              <Depth colorA="#00ffff" colorB="#ff8f00" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
              <Noise mapping="local" type="cell" scale={0.5} mode="softlight" />
            </LayerMaterial>
          </mesh>
        </Environment>



      </Canvas>
    </>
  );
}

export default App;
