import { useState, useEffect } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

/**
 * ShaderBackground
 * A cinematic animated mesh-gradient divider used between sections.
 */
export default function ShaderBackground({ speed = 0.7, height = "260px" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="shader-bg-wrap" style={{ height }}>
      {mounted && (
        <MeshGradient
          style={{ width: "100%", height: "100%", display: "block" }}
          colors={["#0f0f0f", "#1a1a1a", "#2a2a2a", "#111111"]}
          speed={speed}
          backgroundColor="#0f0f0f"
        />
      )}
      {/* Subtle gradient vignette to blend with surrounding sections */}
      <div className="shader-bg-top-fade" />
      <div className="shader-bg-bot-fade" />
    </div>
  );
}
