"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";

interface ScrollyCanvasProps {
  totalFrames?: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const ScrollyCanvas: React.FC<ScrollyCanvasProps> = ({
  totalFrames = 90,
  containerRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const currentFrameRef = useRef(0);

  // Bind scroll to the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload image sequence
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(2, "0");
      // Path matches the generated sequence images
      img.src = `/sequence/frame_${frameNum}_delay-0.067s.webp`;

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setImagesLoaded(count);

        if (count === totalFrames) {
          imagesRef.current = loadedImages;
          setIsFullyLoaded(true);
          // Render initial frame once loaded
          renderFrame(0);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setImagesLoaded(count);
        if (count === totalFrames) {
          imagesRef.current = loadedImages;
          setIsFullyLoaded(true);
          renderFrame(0);
        }
      };

      loadedImages.push(img);
    }

    return () => {
      isMounted = false;
    };
  }, [totalFrames]);

  // Canvas drawing with object-fit: cover and crisp DPI scaling
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set high-res canvas internal buffer size
    const displayWidth = Math.floor(rect.width);
    const displayHeight = Math.floor(rect.height);

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Clear background with #121212
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Calculate object-fit: cover dimensions
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imgAspect) {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgAspect;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgAspect;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  // Handle dynamic resize
  useEffect(() => {
    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update canvas on scroll progress change
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(latest * totalFrames))
    );

    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      requestAnimationFrame(() => renderFrame(frameIndex));
    }
  });

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212] z-0">
      {/* HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="h-full w-full object-cover transition-opacity duration-500 block"
        style={{ opacity: isFullyLoaded ? 1 : 0.4 }}
      />

      {/* Sleek Loading Indicator overlay until frames preload */}
      {!isFullyLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121212]/90 backdrop-blur-md z-30 transition-opacity duration-700">
          <div className="relative flex items-center justify-center">
            <div className="h-16 w-16 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
            <span className="absolute text-xs font-mono text-blue-400">
              {Math.round((imagesLoaded / totalFrames) * 100)}%
            </span>
          </div>
          <p className="mt-4 text-xs font-mono tracking-widest text-gray-400 uppercase">
            Preloading 3D Frame Sequence...
          </p>
        </div>
      )}
    </div>
  );
};
