import { useEffect, useRef } from "react";
import reactLogo from "../../assets/React.svg";

export default function Tumbleweed404() {
  const logoRef = useRef<HTMLImageElement | null>(null); // ✅ move useRef here

  useEffect(() => {
    const logo = logoRef.current;

    if (logo) {
      logo.animate(
        [
          { transform: "translateX(-150px) rotate(0deg)" },
          { transform: "translateX(100vw) rotate(1080deg)" },
        ],
        {
          duration: 8000,
          iterations: Infinity,
          easing: "linear",
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-8/12 my-auto pr flex flex-col items-center justify-center bg-[#fdf6e3] text-center relative">
      <h1 className="text-6xl font-bold text-gray-800 z-10">404</h1>
      <p className="text-xl text-gray-600 z-10">This route rolled away...</p>
      <img
        ref={logoRef}
        src={reactLogo}
        alt="React Logo"
        className="absolute bottom-10 left-[-150px] w-20 h-20 opacity-70"
      />
    </div>
  );
}
