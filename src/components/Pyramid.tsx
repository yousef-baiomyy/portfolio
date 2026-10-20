import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const vertexShader = `
varying vec3 vPosition;
void main() {
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform float uIntensity;
uniform float uPulseSpeed;
uniform float uOpacity;
varying vec3 vPosition;

void main() {
  vec3 color2 = vec3(0.0, 0.941, 1.0);
  float t = vPosition.y + 3.0;
  float pulse = sin(t * 1.5 - uTime * uPulseSpeed) * 0.5 + 0.5;
  float edge = 1.0 - abs(vPosition.x) * 0.15;
  float finalIntensity = pulse * edge * uIntensity;
  vec3 finalColor = color2 * finalIntensity;
  gl_FragColor = vec4(finalColor, uOpacity * finalIntensity);
}
`;

interface Satellite {
  mesh: THREE.Mesh;
  orbitRadius: number;
  orbitSpeed: number;
  yOffset: number;
  angle: number;
  rotationAxis: THREE.Vector3;
}

function createSatellite(
  size: number,
  orbitRadius: number,
  orbitSpeed: number,
  yOffset: number,
  colorHex: number,
  scene: THREE.Group
): Satellite {
  const geometry = new THREE.SphereGeometry(size, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: colorHex,
    wireframe: true,
    transparent: true,
    opacity: 0.6,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return {
    mesh,
    orbitRadius,
    orbitSpeed,
    yOffset,
    angle: Math.random() * Math.PI * 2,
    rotationAxis: new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize(),
  };
}

export default function Pyramid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.02);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(8, 6, 10);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return; // no WebGL → the dark container background stays visible
    }
    renderer.setClearColor(0x050505, 1);
    // If the browser ever drops the WebGL context, hide the canvas so the
    // dark background shows instead of a blank/white layer.
    renderer.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      renderer.domElement.style.opacity = '0';
    });
    renderer.domElement.addEventListener('webglcontextrestored', () => {
      renderer.domElement.style.opacity = '1';
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const pyramidGroup = new THREE.Group();
    scene.add(pyramidGroup);

    const geometry = new THREE.ConeGeometry(2.5, 6, 4, 1, true);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 0.5 },
        uPulseSpeed: { value: 1.5 },
        uOpacity: { value: 0 },
      },
    });

    const pyramid = new THREE.Mesh(geometry, material);
    pyramid.position.y = 1;
    pyramidGroup.add(pyramid);

    const sat1 = createSatellite(0.25, 4.5, 0.4, 2.5, 0x00f0ff, pyramidGroup);
    const sat2 = createSatellite(0.18, 5.5, 0.25, 0.0, 0x0088ff, pyramidGroup);
    const sat3 = createSatellite(0.12, 6.5, 0.15, -2.0, 0x0044ff, pyramidGroup);
    const satellites = [sat1, sat2, sat3];

    const gridHelper = new THREE.GridHelper(50, 100, 0x111111, 0x0a0a0a);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    let isDragging = false;
    renderer.domElement.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    renderer.domElement.addEventListener('mousemove', () => {
      if (isDragging) controls.update();
    });

    const clock = new THREE.Clock();
    let introAnimTime = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const delta = clock.getDelta();

      if (introAnimTime < 1) {
        introAnimTime += delta * 0.5;
        material.uniforms.uOpacity.value = Math.min(introAnimTime * 1.5, 1);
        material.uniforms.uIntensity.value = introAnimTime;
      } else {
        material.uniforms.uIntensity.value = 1.0 + Math.sin(time * 0.5) * 0.1;
      }

      material.uniforms.uTime.value = time;
      pyramidGroup.rotation.y += 0.002;

      for (const s of satellites) {
        s.angle += s.orbitSpeed * 0.01;
        s.mesh.position.x = Math.cos(s.angle) * s.orbitRadius;
        s.mesh.position.z = Math.sin(s.angle) * s.orbitRadius;
        s.mesh.position.y = s.yOffset + Math.sin(time + s.angle) * 0.3;
        s.mesh.rotateOnAxis(s.rotationAxis, 0.02);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="pyramid-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
        backgroundColor: '#050505',
      }}
    />
  );
}
