import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function SpellConstellation() {
  const mountRef = useRef(null); // Reference to the div container

  useEffect(() => {
    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Background - Colorful Nebula
    const loader = new THREE.TextureLoader();
    loader.load("/nebula.jpg", (texture) => {
      scene.background = texture;
    });

    // Star Material
    const starTexture = new THREE.TextureLoader().load("/glowing_star.png");
    const starMaterial = new THREE.SpriteMaterial({ map: starTexture });

    // Create Stars
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const sprite = new THREE.Sprite(starMaterial);
      sprite.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      sprite.scale.set(0.5, 0.5, 0.5);
      scene.add(sprite);
      stars.push(sprite);
    }

    // Create Constellation Lines
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
    const lineGeometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < stars.length - 1; i++) {
      positions.push(stars[i].position.x, stars[i].position.y, stars[i].position.z);
      positions.push(stars[i + 1].position.x, stars[i + 1].position.y, stars[i + 1].position.z);
    }

    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Mouse parallax effect
    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (mouseY - camera.position.y) * 0.05;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      mountRef.current.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
}
