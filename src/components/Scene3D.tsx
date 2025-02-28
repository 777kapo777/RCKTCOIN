import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Earth({ rotation = 0.001 }) {
  const earthRef = useRef();
  const textures = useTexture({
    map: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
    normalMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
    specularMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
    cloudsMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
  });
  
  useFrame((state) => {
    earthRef.current.rotation.y += rotation;
  });

  return (
    <group ref={earthRef}>
      {/* Earth Core */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={textures.map}
          normalMap={textures.normalMap}
          specularMap={textures.specularMap}
          shininess={15}
        />
      </mesh>

      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshPhongMaterial
          transparent
          opacity={0.4}
          map={textures.cloudsMap}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Enhanced Glow Effect */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshPhongMaterial
          transparent
          opacity={0.2}
          color={new THREE.Color('#60a5fa')}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function RocketEngine() {
  const flameRef = useRef();
  const particlesRef = useRef();
  const time = useRef(0);

  useFrame((state) => {
    time.current += 0.05;
    
    // Animate flame intensity
    const flameIntensity = 2 + Math.sin(time.current) * 0.5;
    flameRef.current.material.opacity = 0.7 + Math.sin(time.current * 2) * 0.3;
    flameRef.current.scale.set(
      1 + Math.sin(time.current * 3) * 0.1,
      1 + Math.cos(time.current * 2) * 0.2,
      1 + Math.sin(time.current * 4) * 0.1
    );

    // Animate particles
    particlesRef.current.children.forEach((particle, i) => {
      particle.position.y -= 0.1;
      particle.material.opacity -= 0.02;

      if (particle.position.y < -3 || particle.material.opacity <= 0) {
        particle.position.y = 0;
        particle.position.x = (Math.random() - 0.5) * 0.5;
        particle.position.z = (Math.random() - 0.5) * 0.5;
        particle.material.opacity = 1;
        particle.scale.set(
          Math.random() * 0.2 + 0.1,
          Math.random() * 0.2 + 0.1,
          Math.random() * 0.2 + 0.1
        );
      }
    });
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Enhanced Engine Nozzle */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.7, 1, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={1}
          roughness={0.2}
          emissive="#ff3300"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Inner Nozzle Glow */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.35, 0.5, 0.4, 32]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main Flame */}
      <mesh ref={flameRef} position={[0, -1, 0]}>
        <coneGeometry args={[0.5, 2, 32]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Particle System */}
      <group ref={particlesRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={i} position={[0, 0, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial
              color={new THREE.Color().setHSL(0.05, 1, 0.7)}
              transparent
              opacity={1}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* Engine Lights */}
      <pointLight position={[0, -0.5, 0]} distance={4} intensity={2} color="#ff6600" />
      <pointLight position={[0, -1, 0]} distance={2} intensity={1} color="#ff8800" />
    </group>
  );
}

function Rocket() {
  const rocketRef = useRef();
  const time = useRef(0);
  const radius = 4;
  
  useFrame((state) => {
    time.current += 0.005;
    
    // Enhanced orbital motion with slight wobble
    rocketRef.current.position.x = Math.cos(time.current) * radius;
    rocketRef.current.position.z = Math.sin(time.current) * radius;
    rocketRef.current.position.y = Math.sin(time.current * 2) * 0.5;
    
    // Smooth rotation with banking effect
    rocketRef.current.rotation.y = -time.current;
    rocketRef.current.rotation.z = Math.sin(time.current * 2) * 0.1;
    rocketRef.current.rotation.x = Math.cos(time.current * 2) * 0.05;
  });

  return (
    <group ref={rocketRef} position={[radius, 0, 0]} rotation={[0, 0, 0]} scale={0.3}>
      {/* Enhanced Main Body with Segments */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
        <meshStandardMaterial
          color="#f0f0f0"
          metalness={0.9}
          roughness={0.3}
          envMapIntensity={1}
        />
      </mesh>

      {/* Body Segments */}
      {[-1, 0, 1].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.51, 0.51, 0.1, 32]} />
          <meshStandardMaterial
            color="#cccccc"
            metalness={0.8}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* Enhanced Nose Cone */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial
          color="#ff2200"
          metalness={0.7}
          roughness={0.3}
          envMapIntensity={1}
        />
      </mesh>

      {/* Enhanced Fins */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <mesh position={[0.5, -1.5, 0]}>
            <boxGeometry args={[0.08, 1, 0.8]} />
            <meshStandardMaterial
              color="#0066ff"
              metalness={0.8}
              roughness={0.2}
              envMapIntensity={1}
            />
          </mesh>
          {/* Fin Reinforcement */}
          <mesh position={[0.45, -1.5, 0]}>
            <boxGeometry args={[0.05, 0.9, 0.7]} />
            <meshStandardMaterial
              color="#0044cc"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Enhanced Windows */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <mesh position={[0.48, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
            <meshPhysicalMaterial
              color="#80ffff"
              metalness={0.1}
              roughness={0.1}
              transmission={0.9}
              thickness={0.5}
              envMapIntensity={2}
            />
          </mesh>
        </group>
      ))}

      {/* RCS Thrusters */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <mesh position={[0.5, 1.5, 0]} scale={0.2}>
            <cylinderGeometry args={[0.2, 0.2, 0.3, 12]} />
            <meshStandardMaterial
              color="#333333"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}

      {/* Enhanced Engine Section */}
      <RocketEngine />
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="h-full w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1, 8]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />
        <fog attach="fog" args={['#000000', 0, 30]} />
        <Earth />
        <Rocket />
      </Canvas>
    </div>
  );
}