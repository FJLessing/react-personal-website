import { useEffect, useRef } from "react";

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;

  useEffect(() => {
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;

    const setSize = () => {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };
    setSize();

    const ctx = canvas!.getContext("2d");
    if (!ctx) return;
    let imageData = ctx!.createImageData(window.innerWidth, window.innerHeight);
    let frameid: number;

    const render = () => {
      for (let i = 0; i < imageData.data.length; i += 4) {
        const pixelVal = Math.floor(Math.random() * 255);
        imageData.data[i] = pixelVal;
        imageData.data[i + 1] = pixelVal;
        imageData.data[i + 2] = pixelVal;
        imageData.data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      frameid = requestAnimationFrame(render);
    };

    const onResize = () => {
      setSize();
    };

    render();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameid);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 inset-0 w-screen h-screen z-[-1] pointer-events-none"
    ></canvas>
  );
}
